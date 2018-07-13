using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmployeeOnboardingAPI
{
    public class UserProfileData
    {
        public PersonalData personalData;
        public QualificationData[] qualificationData;
        public TechnicalSkillData[] technicalSkillData;
        public FunctionalSkillData[] functionalSkillData;
        public TainingData[] trainingData;
        public CertificationData[] certificationData;
        public EmployerData[] EmployerData;
        public MembershipData[] MemberShipData;
        public InsuranceData insuranceData;
        public AdditionalData additionalData;
    }
}