import { PersonalData } from "./PersonalData";
import { QualificationData } from "./QualificationData";
import { TechnicalSkillData } from "./SkillData";
import { FunctionalSkillData } from "./FunctionalSkillData";
import { TrainingData } from "./TrainingData";
import { CertificationData } from "./CertificationData";
import { EmployerData } from "./EmployerData";
import { MemberShipData } from "./MemberShipData";
import { InsuranceData } from "./InsuranceData";
import { AdditionalDetailsData } from "./AdditionalDetailsData";

export class UserProfile
{
    PersonalData:PersonalData;
    QualificationData:Array<QualificationData>;
    TechnicalSkillData:Array<TechnicalSkillData>;
    FunctionalSkillData:Array<FunctionalSkillData>;
    TrainingData:Array<TrainingData>;
    CertificationData:Array<CertificationData>;
    EmployerData:Array<EmployerData>;
    MembershipData:Array<MemberShipData>;
    InsuranceData:InsuranceData;
    AdditionalData:AdditionalDetailsData;
}