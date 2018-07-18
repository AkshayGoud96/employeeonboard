using System;
using System.Linq;

namespace EmployeeOnboardingAPI
{
    public class OnboardingHelper
    {
        public string VerifyUserDetails(string email, string fullname)
        {
            string status = string.Empty;
            try
            {
                using (EmployeeOnboardEntities db = new EmployeeOnboardEntities())
                {
                    UserOfferDetail user = db.UserOfferDetails.Where(x => (x.emailID == email && x.name == fullname)).FirstOrDefault();
                    status = user != null ? (user.isSubmitted == true ? "Submitted" : "Saved") : "NoRecord";
                    return status;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        internal string SaveUserProfileData(UserProfileData userProfile, string email)
        {
            using (EmployeeOnboardEntities db = new EmployeeOnboardEntities())
            {
                try
                {
                    if (db.UserOfferDetails.Where(x => x.emailID == email).SingleOrDefault().isSubmitted == false)
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
                            profiledata = UpdateProfileData(userProfile, profiledata);

                            db.SaveChanges();
                        }
                        else
                        {
                            UserProfile profile = GenerateProfileData(userProfile, email);

                            db.UserProfiles.Add(profile);
                            db.SaveChanges();
                        }

                        return "Data is saved Successfully";
                    }
                    else
                    {
                        return "Data is already submitted cannot make any further changes";
                    }
                }
                catch (Exception ex)
                {

                    throw;
                }
            }
        }

        private UserProfile UpdateProfileData(UserProfileData userProfile, UserProfile profiledata)
        {
            // Personal Data
            if (userProfile.personalData != null)
            {
                UpdatePersonalData(userProfile, ref profiledata);
            }

            //Qualification Data
            if (userProfile.qualificationData != null)
            {
                foreach (var qualification in userProfile.qualificationData)
                {
                    if (qualification.QDID != null)
                    {
                        var data = profiledata.QualificationDatas.Where(q => q.QDID == qualification.QDID).Single();
                        if (data != null)
                        {
                            UpdateQualificationData(ref profiledata, data);
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
            }

            //Technical Skills Data
            if (userProfile.technicalSkillData != null)
            {
                foreach (var technicalSkill in userProfile.technicalSkillData)
                {
                    if (technicalSkill.TSDID != null)
                    {
                        var data = profiledata.TechnicalSkillDatas.Where(q => q.TSDID == technicalSkill.TSDID).Single();
                        if (data != null)
                        {
                            UpdateTechnicalSkillsData(ref profiledata, data);
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
            }

            //Functional Skills Data
            if (userProfile.functionalSkillData != null)
            {
                foreach (var functionalSkill in userProfile.functionalSkillData)
                {
                    if (functionalSkill.FSDID != null)
                    {
                        var data = profiledata.FunctionalSkillDatas.Where(q => q.FSDID == functionalSkill.FSDID).Single();
                        if (data != null)
                        {
                            UpdateFunctionalSkillData(ref profiledata, data);
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
            }
            //Certifications Data
            if (userProfile.certificationData != null)
            {
                foreach (var certification in userProfile.certificationData)
                {
                    if (certification.CDID != null)
                    {
                        var data = profiledata.CertificationDatas.Where(q => q.CDID == certification.CDID).Single();

                        if (data != null)
                        {
                            UpdateCertificationData(ref profiledata, data);
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
            }

            //Memberships Data
            if (userProfile.MemberShipData != null)
            {
                foreach (var membership in userProfile.MemberShipData)
                {
                    if (membership.MDID != null)
                    {
                        var data = profiledata.MembershipDatas.Where(q => q.MDID == membership.MDID).Single();

                        if (data != null)
                        {
                            UpdateMembershipData(ref profiledata, data);
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
            }

            //Employer Data
            if (userProfile.EmployerData != null)
            {
                foreach (var employer in userProfile.EmployerData)
                {
                    if (employer.EDID != null)
                    {
                        var data = profiledata.EmployerDatas.Where(q => q.EDID == employer.EDID).Single();

                        if (data != null)
                        {
                            UpdateEmployerData(ref profiledata, data);
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
            }


            //Trainings Data
            if (userProfile.trainingData != null)
            {
                foreach (var training in userProfile.trainingData)
                {
                    if (training.TDID != null)
                    {
                        var data = userProfile.trainingData.Where(q => q.TDID == training.TDID).Single();

                        if (data != null)
                        {
                            UpdateTrainingData(ref profiledata, data);
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
            }

            if (profiledata.InsuranceDatas.Count>0)
            {
                //Insurance Data
                UpdateInsuranceData(userProfile, ref profiledata);
            }

            //Additional Data
            if (profiledata.AdditionalDatas.Count>0)
            {
                UpdateAdditionalData(userProfile, ref profiledata);
            }
            return profiledata;
        }

        private static UserProfile GenerateProfileData(UserProfileData userProfile, string email)
        {
            UserProfile profile = new UserProfile();
            profile.UPID = Convert.ToString(Guid.NewGuid());
            profile.email = email;

            if (userProfile.personalData != null)
            {
                PersonalData pd = new PersonalData();

                pd = userProfile.personalData;

                pd.UPID = profile.UPID;
                pd.PDID = Convert.ToString(Guid.NewGuid());
                profile.PersonalDatas.Add(pd);
            }
            if (userProfile.qualificationData != null)
            {
                QualificationData qd = new QualificationData();
                foreach (var qualification in userProfile.qualificationData)
                {

                    qd = qualification;
                    qd.UPID = profile.UPID;
                    qd.QDID = Convert.ToString(Guid.NewGuid());
                    profile.QualificationDatas.Add(qd);
                }
            }
            if (userProfile.technicalSkillData != null)
            {
                foreach (var technicalSkill in userProfile.technicalSkillData)
                {
                    TechnicalSkillData tsd = new TechnicalSkillData();
                    tsd = technicalSkill;
                    tsd.UPID = profile.UPID;
                    tsd.TSDID = Convert.ToString(Guid.NewGuid());
                    profile.TechnicalSkillDatas.Add(tsd);
                }
            }
            if (userProfile.functionalSkillData != null)
            {
                foreach (var functionalSkill in userProfile.functionalSkillData)
                {
                    FunctionalSkillData fsd = new FunctionalSkillData();
                    fsd = functionalSkill;
                    fsd.UPID = profile.UPID;
                    fsd.FSDID = Convert.ToString(Guid.NewGuid());
                    profile.FunctionalSkillDatas.Add(fsd);
                }
            }
            if (userProfile.certificationData != null)
            {
                foreach (var certification in userProfile.certificationData)
                {
                    CertificationData cd = new CertificationData();
                    cd = certification;
                    cd.UPID = profile.UPID;
                    cd.CDID = Convert.ToString(Guid.NewGuid());
                    profile.CertificationDatas.Add(cd);
                }
            }
            if (userProfile.trainingData != null)
            {
                foreach (var training in userProfile.trainingData)
                {
                    TainingData td = new TainingData();
                    td = training;
                    td.UPID = profile.UPID;
                    td.TDID = Convert.ToString(Guid.NewGuid());
                    profile.TainingDatas.Add(td);
                }
            }
            if (userProfile.EmployerData != null)
            {
                foreach (var employerData in userProfile.EmployerData)
                {
                    EmployerData ed = new EmployerData();
                    ed = employerData;
                    ed.UPID = profile.UPID;
                    ed.EDID = Convert.ToString(Guid.NewGuid());
                    profile.EmployerDatas.Add(ed);
                }
            }
            if (userProfile.MemberShipData != null)
            {
                foreach (var membershipData in userProfile.MemberShipData)
                {
                    MembershipData md = new MembershipData();
                    md = membershipData;
                    md.UPID = profile.UPID;
                    md.MDID = Convert.ToString(Guid.NewGuid());
                    profile.MembershipDatas.Add(md);
                }
            }
            if (userProfile.insuranceData != null)
            {
                InsuranceData id = new InsuranceData();
                id = userProfile.insuranceData;
                id.UPID = profile.UPID;
                id.IDID = Convert.ToString(Guid.NewGuid());

                profile.InsuranceDatas.Add(id);
            }
            if (userProfile.additionalData != null)
            {

                AdditionalData ad = new AdditionalData();
                ad = userProfile.additionalData;
                ad.UPID = profile.UPID;
                ad.ADID = Convert.ToString(Guid.NewGuid());

                profile.AdditionalDatas.Add(ad);
            }
            return profile;
        }

        private static void UpdateTrainingData(ref UserProfile profiledata, TainingData data)
        {
            profiledata.TainingDatas.Where(q => q.TDID == data.TDID).FirstOrDefault().Category = data.Category;
            profiledata.TainingDatas.Where(q => q.TDID == data.TDID).FirstOrDefault().InstituteName = data.InstituteName;
            profiledata.TainingDatas.Where(q => q.TDID == data.TDID).FirstOrDefault().Name = data.Name;
            profiledata.TainingDatas.Where(q => q.TDID == data.TDID).FirstOrDefault().StartDate = data.StartDate;
            profiledata.TainingDatas.Where(q => q.TDID == data.TDID).FirstOrDefault().TotalHours = data.TotalHours;
            profiledata.TainingDatas.Where(q => q.TDID == data.TDID).FirstOrDefault().TrainerName = data.TrainerName;
        }

        private static void UpdateEmployerData(ref UserProfile profiledata, EmployerData data)
        {
            profiledata.EmployerDatas.Where(q => q.EDID == data.EDID).FirstOrDefault().Designation = data.Designation;
            profiledata.EmployerDatas.Where(q => q.EDID == data.EDID).FirstOrDefault().Domain = data.Domain;
            profiledata.EmployerDatas.Where(q => q.EDID == data.EDID).FirstOrDefault().EmployerName = data.EmployerName;
            profiledata.EmployerDatas.Where(q => q.EDID == data.EDID).FirstOrDefault().JoiningDate = data.JoiningDate;
            profiledata.EmployerDatas.Where(q => q.EDID == data.EDID).FirstOrDefault().ReleivingDate = data.ReleivingDate;
        }

        private static void UpdateMembershipData(ref UserProfile profiledata, MembershipData data)
        {
            profiledata.MembershipDatas.Where(q => q.MDID == data.MDID).FirstOrDefault().Association = data.Association;
            profiledata.MembershipDatas.Where(q => q.MDID == data.MDID).FirstOrDefault().MembershipID = data.MembershipID;
            profiledata.MembershipDatas.Where(q => q.MDID == data.MDID).FirstOrDefault().MembershipType = data.MembershipType;
            profiledata.MembershipDatas.Where(q => q.MDID == data.MDID).FirstOrDefault().MembershipYear = data.MembershipYear;
            profiledata.MembershipDatas.Where(q => q.MDID == data.MDID).FirstOrDefault().ValidUpto = data.ValidUpto;
        }

        private static void UpdateCertificationData(ref UserProfile profiledata, CertificationData data)
        {
            profiledata.CertificationDatas.Where(q => q.CDID == data.CDID).FirstOrDefault().Category = data.Category;
            profiledata.CertificationDatas.Where(q => q.CDID == data.CDID).FirstOrDefault().CertificationID = data.CertificationID;
            profiledata.CertificationDatas.Where(q => q.CDID == data.CDID).FirstOrDefault().CertifiedBy = data.CertifiedBy;
            profiledata.CertificationDatas.Where(q => q.CDID == data.CDID).FirstOrDefault().IssuedDate = data.IssuedDate;
            profiledata.CertificationDatas.Where(q => q.CDID == data.CDID).FirstOrDefault().Title = data.Title;
            profiledata.CertificationDatas.Where(q => q.CDID == data.CDID).FirstOrDefault().ValidUpto = data.ValidUpto;
        }

        private static void UpdateFunctionalSkillData(ref UserProfile profiledata, FunctionalSkillData data)
        {
            profiledata.FunctionalSkillDatas.Where(q => q.FSDID == data.FSDID).FirstOrDefault().Experience = data.Experience;
            profiledata.FunctionalSkillDatas.Where(q => q.FSDID == data.FSDID).FirstOrDefault().Expertise = data.Expertise;
            profiledata.FunctionalSkillDatas.Where(q => q.FSDID == data.FSDID).FirstOrDefault().LastWorkedOn = data.LastWorkedOn;
            profiledata.FunctionalSkillDatas.Where(q => q.FSDID == data.FSDID).FirstOrDefault().Skill = data.Skill;
        }

        private static void UpdateTechnicalSkillsData(ref UserProfile profiledata, TechnicalSkillData data)
        {
            profiledata.TechnicalSkillDatas.Where(q => q.TSDID == data.TSDID).FirstOrDefault().Experience = data.Experience;
            profiledata.TechnicalSkillDatas.Where(q => q.TSDID == data.TSDID).FirstOrDefault().Expertise = data.Expertise;
            profiledata.TechnicalSkillDatas.Where(q => q.TSDID == data.TSDID).FirstOrDefault().LastWorkedOn = data.LastWorkedOn;
            profiledata.TechnicalSkillDatas.Where(q => q.TSDID == data.TSDID).FirstOrDefault().Skill = data.Skill;
            profiledata.TechnicalSkillDatas.Where(q => q.TSDID == data.TSDID).FirstOrDefault().Type = data.Type;
            profiledata.TechnicalSkillDatas.Where(q => q.TSDID == data.TSDID).FirstOrDefault().Version = data.Version;
        }

        private static void UpdateQualificationData(ref UserProfile profiledata, QualificationData data)
        {
            profiledata.QualificationDatas.Where(q => q.QDID == data.QDID).FirstOrDefault().Grade = data.Grade;
            profiledata.QualificationDatas.Where(q => q.QDID == data.QDID).FirstOrDefault().Institution = data.Institution;
            profiledata.QualificationDatas.Where(q => q.QDID == data.QDID).FirstOrDefault().Percentage = data.Percentage;
            profiledata.QualificationDatas.Where(q => q.QDID == data.QDID).FirstOrDefault().Qualification = data.Qualification;
            profiledata.QualificationDatas.Where(q => q.QDID == data.QDID).FirstOrDefault().University = data.University;
            profiledata.QualificationDatas.Where(q => q.QDID == data.QDID).FirstOrDefault().YearOfCompletion = data.YearOfCompletion;
        }

        internal void SubmitUserData(string email)
        {
            using (EmployeeOnboardEntities db=new EmployeeOnboardEntities())
            {
             var data=  db.UserOfferDetails.Where(x => x.emailID == email).Single();
              data.isSubmitted = true;
              db.SaveChanges();
            }
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
            tsd.UPID = profiledata.UPID;
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
            qd.UPID = profiledata.UPID;
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

}