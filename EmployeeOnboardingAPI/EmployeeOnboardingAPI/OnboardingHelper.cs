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
    }
}