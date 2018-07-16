using System;
using System.Linq;

namespace EmployeeOnboardingAPI
{
    public class OnboardingHelper
    {
        public bool VerifyUserDetails(string email, string fullname)
        {
            try
            {
                using (EmployeeOnboardEntities db = new EmployeeOnboardEntities())
                {
                    UserOfferDetail user = db.UserOfferDetails.Where(x => (x.emailID == email && x.name == fullname)).FirstOrDefault();
                    if (user != null)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        internal void SaveUserProfileData(UserProfileData userProfile, string email)
        {
            bool isEdit = false;
            using (EmployeeOnboardEntities db = new EmployeeOnboardEntities())
            {
                UserProfile profiledata = db.UserProfiles.Include("AdditionalDatas")
                    .Include("FunctionalSkillDatas")
                    .Include("CertificationDatas")
                    .Include("EmployerDatas")
                    .Include("InsuranceDatas")
                    .Include("MembershipDatas")
                    .Include("PersonalDatas")
                    .Include("QualificationDatas")
                    .Include("TainingDatas")
                    .Include("TechnicalSkillDatas").Where(s => s.email == email).FirstOrDefault();

                if (profiledata != null)
                {
                    isEdit = true;

                    // Personal Data
                    UpdatePersonalData(userProfile, ref profiledata);

                    //Qualification Data
                    foreach (var qualification in userProfile.qualificationData)
                    {
                        if (qualification.QDID != null)
                        {
                            var data = profiledata.QualificationDatas.Where(q => q.QDID == qualification.QDID).Single();
                            if (data != null)
                            {
                                profiledata.QualificationDatas.Where(q => q.QDID == data.QDID).FirstOrDefault().Grade = data.Grade;
                                profiledata.QualificationDatas.Where(q => q.QDID == data.QDID).FirstOrDefault().Institution = data.Institution;
                                profiledata.QualificationDatas.Where(q => q.QDID == data.QDID).FirstOrDefault().Percentage = data.Percentage;
                                profiledata.QualificationDatas.Where(q => q.QDID == data.QDID).FirstOrDefault().Qualification = data.Qualification;
                                profiledata.QualificationDatas.Where(q => q.QDID == data.QDID).FirstOrDefault().University = data.University;
                                profiledata.QualificationDatas.Where(q => q.QDID == data.QDID).FirstOrDefault().YearOfCompletion = data.YearOfCompletion;
                            }
                            else
                            {
                                AddQualificationData(ref profiledata, qualification);
                            }
                        }
                        else
                        {
                            AddQualificationData(ref profiledata, qualification);
                        }
                    }

                    //Technical Skills Data
                    foreach (var technicalSkill in userProfile.technicalSkillData)
                    {
                        if (technicalSkill.TSDID != null)
                        {
                            var data = profiledata.TechnicalSkillDatas.Where(q => q.TSDID == technicalSkill.TSDID).Single();
                            if (data != null)
                            {
                                profiledata.TechnicalSkillDatas.Where(q => q.TSDID == data.TSDID).FirstOrDefault().Experience = data.Experience;
                                profiledata.TechnicalSkillDatas.Where(q => q.TSDID == data.TSDID).FirstOrDefault().Expertise = data.Expertise;
                                profiledata.TechnicalSkillDatas.Where(q => q.TSDID == data.TSDID).FirstOrDefault().LastWorkedOn = data.LastWorkedOn;
                                profiledata.TechnicalSkillDatas.Where(q => q.TSDID == data.TSDID).FirstOrDefault().Skill = data.Skill;
                                profiledata.TechnicalSkillDatas.Where(q => q.TSDID == data.TSDID).FirstOrDefault().Type = data.Type;
                                profiledata.TechnicalSkillDatas.Where(q => q.TSDID == data.TSDID).FirstOrDefault().Version = data.Version;
                            }
                            else
                            {
                                AddTechnicalSkillData(ref profiledata, technicalSkill);
                            }
                        }
                        else
                        {
                            AddTechnicalSkillData(ref profiledata, technicalSkill);
                        }
                    }

                    //Functional Skills Data
                    foreach (var functionalSkill in userProfile.functionalSkillData)
                    {
                        if (functionalSkill.FSDID != null)
                        {
                            var data = profiledata.FunctionalSkillDatas.Where(q => q.FSDID == functionalSkill.FSDID).Single();
                            if (data != null)
                            {
                                profiledata.FunctionalSkillDatas.Where(q => q.FSDID == data.FSDID).FirstOrDefault().Experience = data.Experience;
                                profiledata.FunctionalSkillDatas.Where(q => q.FSDID == data.FSDID).FirstOrDefault().Expertise = data.Expertise;
                                profiledata.FunctionalSkillDatas.Where(q => q.FSDID == data.FSDID).FirstOrDefault().LastWorkedOn = data.LastWorkedOn;
                                profiledata.FunctionalSkillDatas.Where(q => q.FSDID == data.FSDID).FirstOrDefault().Skill = data.Skill;
                            }
                            else
                            {
                                AddFunctionalSkillData(ref profiledata, functionalSkill);
                            }
                        }
                        else
                        {
                            AddFunctionalSkillData(ref profiledata, functionalSkill);
                        }
                    }

                    //Certifications Data
                    foreach (var certification in userProfile.certificationData)
                    {
                        if (certification.CDID != null)
                        {
                            var data = profiledata.CertificationDatas.Where(q => q.CDID == certification.CDID).Single();

                            if (data != null)
                            {
                                profiledata.CertificationDatas.Where(q => q.CDID == data.CDID).FirstOrDefault().Category = data.Category;
                                profiledata.CertificationDatas.Where(q => q.CDID == data.CDID).FirstOrDefault().CertificationID = data.CertificationID;
                                profiledata.CertificationDatas.Where(q => q.CDID == data.CDID).FirstOrDefault().CertifiedBy = data.CertifiedBy;
                                profiledata.CertificationDatas.Where(q => q.CDID == data.CDID).FirstOrDefault().IssuedDate = data.IssuedDate;
                                profiledata.CertificationDatas.Where(q => q.CDID == data.CDID).FirstOrDefault().Title = data.Title;
                                profiledata.CertificationDatas.Where(q => q.CDID == data.CDID).FirstOrDefault().ValidUpto = data.ValidUpto;
                            }
                            else
                            {
                                AddCertificationData(ref profiledata, certification);
                            }
                        }
                        else
                        {
                            AddCertificationData(ref profiledata, certification);
                        }
                    }

                    //Memberships Data
                    foreach (var membership in userProfile.MemberShipData)
                    {
                        if (membership.MDID != null)
                        {
                            var data = profiledata.MembershipDatas.Where(q => q.MDID == membership.MDID).Single();

                            if (data != null)
                            {
                                profiledata.MembershipDatas.Where(q => q.MDID == data.MDID).FirstOrDefault().Association = data.Association;
                                profiledata.MembershipDatas.Where(q => q.MDID == data.MDID).FirstOrDefault().MembershipID = data.MembershipID;
                                profiledata.MembershipDatas.Where(q => q.MDID == data.MDID).FirstOrDefault().MembershipType = data.MembershipType;
                                profiledata.MembershipDatas.Where(q => q.MDID == data.MDID).FirstOrDefault().MembershipYear = data.MembershipYear;
                                profiledata.MembershipDatas.Where(q => q.MDID == data.MDID).FirstOrDefault().ValidUpto = data.ValidUpto;
                            }
                            else
                            {
                                AddMemberShipData(ref profiledata, membership);
                            }
                        }
                        else
                        {
                            AddMemberShipData(ref profiledata, membership);
                        }
                    }

                    //Employer Data
                    foreach (var employer in userProfile.EmployerData)
                    {
                        if (employer.EDID != null)
                        {
                            var data = profiledata.EmployerDatas.Where(q => q.EDID == employer.EDID).Single();

                            if (data != null)
                            {
                                profiledata.EmployerDatas.Where(q => q.EDID == data.EDID).FirstOrDefault().Designation = data.Designation;
                                profiledata.EmployerDatas.Where(q => q.EDID == data.EDID).FirstOrDefault().Domain = data.Domain;
                                profiledata.EmployerDatas.Where(q => q.EDID == data.EDID).FirstOrDefault().EmployerName = data.EmployerName;
                                profiledata.EmployerDatas.Where(q => q.EDID == data.EDID).FirstOrDefault().JoiningDate = data.JoiningDate;
                                profiledata.EmployerDatas.Where(q => q.EDID == data.EDID).FirstOrDefault().ReleivingDate = data.ReleivingDate;
                            }
                            else
                            {
                                AddEmployerData(ref profiledata, employer);
                            }
                        }
                        else
                        {
                            AddEmployerData(ref profiledata, employer);
                        }
                    }


                    //Trainings Data
                    foreach (var training in userProfile.trainingData)
                    {
                        if (training.TDID != null)
                        {
                            var data = userProfile.trainingData.Where(q => q.TDID == training.TDID).Single();

                            if (data != null)
                            {
                                profiledata.TainingDatas.Where(q => q.TDID == data.TDID).FirstOrDefault().Category = data.Category;
                                profiledata.TainingDatas.Where(q => q.TDID == data.TDID).FirstOrDefault().InstituteName = data.InstituteName;
                                profiledata.TainingDatas.Where(q => q.TDID == data.TDID).FirstOrDefault().Name = data.Name;
                                profiledata.TainingDatas.Where(q => q.TDID == data.TDID).FirstOrDefault().StartDate = data.StartDate;
                                profiledata.TainingDatas.Where(q => q.TDID == data.TDID).FirstOrDefault().TotalHours = data.TotalHours;
                                profiledata.TainingDatas.Where(q => q.TDID == data.TDID).FirstOrDefault().TrainerName = data.TrainerName;
                            }
                            else
                            {
                                AddTrainingData(ref profiledata, training);
                            }
                        }
                        else
                        {
                            AddTrainingData(ref profiledata, training);
                        }
                    }

                    //Insurance Data
                    UpdateInsuranceData(userProfile, ref profiledata);

                    //Additional Data

                    UpdateAdditionalData(userProfile, ref profiledata);

                    db.SaveChanges();
                }
                else
                {
                    UserProfile profile = new UserProfile();
                    profile.UPID = Convert.ToString(Guid.NewGuid());
                    profile.email = email;
                    PersonalData pd = new PersonalData();
                    QualificationData qd = new QualificationData();
                    pd = userProfile.personalData;
                    pd.UPID = profile.UPID;
                    pd.PDID = Convert.ToString(Guid.NewGuid());
                    profile.PersonalDatas.Add(pd);
                    foreach (var qualification in userProfile.qualificationData)
                    {

                        qd = qualification;
                        qd.UPID = profile.UPID;
                        qd.QDID = Convert.ToString(Guid.NewGuid());
                        profile.QualificationDatas.Add(qd);
                    }
                    foreach (var technicalSkill in userProfile.technicalSkillData)
                    {
                        TechnicalSkillData tsd = new TechnicalSkillData();
                        tsd = technicalSkill;
                        tsd.UPID = profile.UPID;
                        tsd.TSDID = Convert.ToString(Guid.NewGuid());
                        profile.TechnicalSkillDatas.Add(tsd);
                    }
                    foreach (var functionalSkill in userProfile.functionalSkillData)
                    {
                        FunctionalSkillData fsd = new FunctionalSkillData();
                        fsd = functionalSkill;
                        fsd.UPID = profile.UPID;
                        fsd.FSDID = Convert.ToString(Guid.NewGuid());
                        profile.FunctionalSkillDatas.Add(fsd);
                    }
                    foreach (var certification in userProfile.certificationData)
                    {
                        CertificationData cd = new CertificationData();
                        cd = certification;
                        cd.UPID = profile.UPID;
                        cd.CDID = Convert.ToString(Guid.NewGuid());
                        profile.CertificationDatas.Add(cd);
                    }
                    foreach (var training in userProfile.trainingData)
                    {
                        TainingData td = new TainingData();
                        td = training;
                        td.UPID = profile.UPID;
                        td.TDID = Convert.ToString(Guid.NewGuid());
                        profile.TainingDatas.Add(td);
                    }
                    foreach (var employerData in userProfile.EmployerData)
                    {
                        EmployerData ed = new EmployerData();
                        ed = employerData;
                        ed.UPID = profile.UPID;
                        ed.EDID = Convert.ToString(Guid.NewGuid());
                        profile.EmployerDatas.Add(ed);
                    }
                    foreach (var membershipData in userProfile.MemberShipData)
                    {
                        MembershipData md = new MembershipData();
                        md = membershipData;
                        md.UPID = profile.UPID;
                        md.MDID = Convert.ToString(Guid.NewGuid());
                        profile.MembershipDatas.Add(md);
                    }
                    InsuranceData id = new InsuranceData();
                    id = userProfile.insuranceData;
                    id.UPID = profile.UPID;
                    id.IDID = Convert.ToString(Guid.NewGuid());

                    profile.InsuranceDatas.Add(id);

                    AdditionalData ad = new AdditionalData();
                    ad = userProfile.additionalData;
                    ad.UPID = profile.UPID;
                    ad.ADID = Convert.ToString(Guid.NewGuid());

                    profile.AdditionalDatas.Add(ad);

                    db.UserProfiles.Add(profile);
                    db.SaveChanges();
                }
            }
            //using (EmployeeOnboardEntities db = new EmployeeOnboardEntities())
            //{

            //    if (profiledata == null)
            //    {
            //        db.UserProfiles.Add(profile);
            //    }
            //    else
            //    {
            //        profiledata.PersonalDatas = profile.PersonalDatas;                   
            //    }
            //    db.SaveChanges();
            //}
        }

        private void AddTrainingData(ref UserProfile profiledata, TainingData training)
        {
            TainingData td = new TainingData();
            td = training;
            td.UPID = profiledata.UPID;
            td.TDID = Convert.ToString(Guid.NewGuid());
            profiledata.TainingDatas.Add(td);
        }

        private void AddEmployerData(ref UserProfile profiledata, EmployerData employer)
        {
            EmployerData ed = new EmployerData();
            ed = employer;
            ed.UPID = profiledata.UPID;
            ed.EDID = Convert.ToString(Guid.NewGuid());
            profiledata.EmployerDatas.Add(ed);
        }

        private void AddMemberShipData(ref UserProfile profiledata, MembershipData membership)
        {
            MembershipData md = new MembershipData();
            md = membership;
            md.UPID = profiledata.UPID;
            md.MDID = Convert.ToString(Guid.NewGuid());
            profiledata.MembershipDatas.Add(md);
        }

        private static void UpdateInsuranceData(UserProfileData userProfile, ref UserProfile profiledata)
        {
            profiledata.InsuranceDatas.FirstOrDefault().Child1DOB = userProfile.insuranceData.Child1DOB;
            profiledata.InsuranceDatas.FirstOrDefault().Child1Gender = userProfile.insuranceData.Child1Gender;
            profiledata.InsuranceDatas.FirstOrDefault().Child1Name = userProfile.insuranceData.Child1Name;
            profiledata.InsuranceDatas.FirstOrDefault().Child2DOB = userProfile.insuranceData.Child2DOB;
            profiledata.InsuranceDatas.FirstOrDefault().Child2Gender = userProfile.insuranceData.Child2Gender;
            profiledata.InsuranceDatas.FirstOrDefault().Child2Name = userProfile.insuranceData.Child2Name;
            profiledata.InsuranceDatas.FirstOrDefault().FatherDOB = userProfile.insuranceData.FatherDOB;
            profiledata.InsuranceDatas.FirstOrDefault().FatherInLawDOB = userProfile.insuranceData.FatherInLawDOB;
            profiledata.InsuranceDatas.FirstOrDefault().FatherInLawName = userProfile.insuranceData.FatherInLawName;
            profiledata.InsuranceDatas.FirstOrDefault().FatherName = userProfile.insuranceData.FatherName;
            profiledata.InsuranceDatas.FirstOrDefault().MaritalStatus = userProfile.insuranceData.MaritalStatus;
            profiledata.InsuranceDatas.FirstOrDefault().MotherDOB = userProfile.insuranceData.MotherDOB;
            profiledata.InsuranceDatas.FirstOrDefault().MotherInLawDOB = userProfile.insuranceData.MotherInLawDOB;
            profiledata.InsuranceDatas.FirstOrDefault().MotherInLawName = userProfile.insuranceData.MotherInLawName;
            profiledata.InsuranceDatas.FirstOrDefault().MotherName = userProfile.insuranceData.MotherName;
            profiledata.InsuranceDatas.FirstOrDefault().RelationshipType = userProfile.insuranceData.RelationshipType;
            profiledata.InsuranceDatas.FirstOrDefault().SpouseDOB = userProfile.insuranceData.SpouseDOB;
            profiledata.InsuranceDatas.FirstOrDefault().SpouseGender = userProfile.insuranceData.SpouseGender;
            profiledata.InsuranceDatas.FirstOrDefault().SpouseName = userProfile.insuranceData.SpouseName;
        }

        private static void UpdateAdditionalData(UserProfileData userProfile, ref UserProfile profiledata)
        {
            profiledata.AdditionalDatas.FirstOrDefault().BankAccountNumber = userProfile.additionalData.BankAccountNumber;
            profiledata.AdditionalDatas.FirstOrDefault().BankName = userProfile.additionalData.BankName;
            profiledata.AdditionalDatas.FirstOrDefault().BloodGroup = userProfile.additionalData.BloodGroup;
            profiledata.AdditionalDatas.FirstOrDefault().DateofMarriage = userProfile.additionalData.DateofMarriage;
            profiledata.AdditionalDatas.FirstOrDefault().EmergencyContact = userProfile.additionalData.EmergencyContact;
            profiledata.AdditionalDatas.FirstOrDefault().PassportNumber = userProfile.additionalData.PassportNumber;
            profiledata.AdditionalDatas.FirstOrDefault().PassportValidUpto = userProfile.additionalData.PassportValidUpto;
            profiledata.AdditionalDatas.FirstOrDefault().PermenantAccountNumber = userProfile.additionalData.PermenantAccountNumber;
            profiledata.AdditionalDatas.FirstOrDefault().PersonalContact = userProfile.additionalData.PersonalContact;
            profiledata.AdditionalDatas.FirstOrDefault().PersonalEmail = userProfile.additionalData.PersonalEmail;
        }

        private void AddCertificationData(ref UserProfile profiledata, CertificationData certification)
        {
            CertificationData cd = new CertificationData();
            cd = certification;
            cd.UPID = profiledata.UPID;
            cd.CDID = Convert.ToString(Guid.NewGuid());
            profiledata.CertificationDatas.Add(cd);
        }

        private void AddFunctionalSkillData(ref UserProfile profiledata, FunctionalSkillData functionalSkill)
        {
            FunctionalSkillData fsd = new FunctionalSkillData();
            fsd = functionalSkill;
            fsd.UPID = profiledata.UPID;
            fsd.FSDID = Convert.ToString(Guid.NewGuid());
            profiledata.FunctionalSkillDatas.Add(fsd);
        }

        private void AddTechnicalSkillData(ref UserProfile profiledata, TechnicalSkillData technicalSkill)
        {
            TechnicalSkillData tsd = new TechnicalSkillData();
            tsd = technicalSkill;
            tsd.UPID = technicalSkill.UPID;
            tsd.TSDID = Convert.ToString(Guid.NewGuid());
            profiledata.TechnicalSkillDatas.Add(tsd);
        }

        private static void UpdatePersonalData(UserProfileData userProfile, ref UserProfile profiledata)
        {
            profiledata.PersonalDatas.FirstOrDefault().Address = userProfile.personalData.Address;
            profiledata.PersonalDatas.FirstOrDefault().City = userProfile.personalData.City;
            profiledata.PersonalDatas.FirstOrDefault().Country = userProfile.personalData.Country;
            profiledata.PersonalDatas.FirstOrDefault().DOB = userProfile.personalData.DOB;
            profiledata.PersonalDatas.FirstOrDefault().FirstName = userProfile.personalData.FirstName;
            profiledata.PersonalDatas.FirstOrDefault().Gender = userProfile.personalData.Gender;
            profiledata.PersonalDatas.FirstOrDefault().LastName = userProfile.personalData.LastName;
            profiledata.PersonalDatas.FirstOrDefault().MiddleName = userProfile.personalData.MiddleName;
            profiledata.PersonalDatas.FirstOrDefault().MobileNumber = userProfile.personalData.MobileNumber;
            profiledata.PersonalDatas.FirstOrDefault().State = userProfile.personalData.State;
        }

        private static void AddQualificationData(ref UserProfile profiledata, QualificationData qualification)
        {
            QualificationData qd = new QualificationData();
            qd = qualification;
            qd.UPID = qualification.UPID;
            qd.QDID = Convert.ToString(Guid.NewGuid());
            profiledata.QualificationDatas.Add(qd);
        }

        internal UserProfile GetUserProfileData(string email)
        {
            using (EmployeeOnboardEntities db = new EmployeeOnboardEntities())
            {
                UserProfile userProfile = db.UserProfiles.Include("AdditionalDatas")
                    .Include("FunctionalSkillDatas")
                    .Include("CertificationDatas")
                    .Include("EmployerDatas")
                    .Include("InsuranceDatas")
                    .Include("MembershipDatas")
                    .Include("PersonalDatas")
                    .Include("QualificationDatas")
                    .Include("TainingDatas")
                    .Include("TechnicalSkillDatas").Where(s => s.email == email).FirstOrDefault();
                return userProfile;
            }
        }
    }

    private void AddCertificationData(ref UserProfile profiledata, CertificationData certification)
    {
        throw new NotImplementedException();
    }
}