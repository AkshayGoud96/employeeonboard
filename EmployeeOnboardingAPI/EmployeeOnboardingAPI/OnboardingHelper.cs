using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmployeeOnboardingAPI
{
    public class OnboardingHelper
    {
        public bool VerifyUserDetails(string email,string fullname)
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

        internal void SaveUserProfileData(UserProfileData userProfile,string email)
        {
          
                UserProfile profile = new UserProfile();
                profile.UPID = Convert.ToString(Guid.NewGuid());
                profile.email = email;
                PersonalData pd = new PersonalData();
                pd = userProfile.personalData;
                pd.UPID = profile.UPID;
                pd.PDID= Convert.ToString(Guid.NewGuid());
                profile.PersonalDatas.Add(pd);
                foreach (var qualification in userProfile.qualificationData)
                {
                    QualificationData qd = new QualificationData();
                    qd = qualification;
                    qd.UPID = profile.UPID;
                    qd.QDID = Convert.ToString(Guid.NewGuid());
                profile.QualificationDatas.Add(qd);
                }
                foreach (var  technicalSkill in userProfile.technicalSkillData)
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
                using (EmployeeOnboardEntities db = new EmployeeOnboardEntities())
                {
                     db.UserProfiles.Add(profile);
                db.SaveChanges();
                }
        }

        internal UserProfile GetUserProfileData(string email)
        {
            using (EmployeeOnboardEntities db = new EmployeeOnboardEntities())
            {
                UserProfile userProfile=db.UserProfiles.Where(s => s.email == email).FirstOrDefault();
                return userProfile;
            }
        }
    }
}