using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EmployeeOnboardingAPI.Controllers
{
    [RoutePrefix("api/Onboarding")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class OnboardingController : ApiController
    {
        [HttpGet]
        [Route("VerifyUser")]
        public HttpResponseMessage VerifyUser(string email,string name)
        {
            try
            {
                OnboardingHelper helper = new OnboardingHelper();
                if (helper.VerifyUserDetails(email, name))
                    return Request.CreateResponse(HttpStatusCode.OK, "Success");
                else
                    return Request.CreateResponse(HttpStatusCode.OK, "No such record");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }

        }
    }
}
