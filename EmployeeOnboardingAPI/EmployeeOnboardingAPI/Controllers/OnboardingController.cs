using Newtonsoft.Json;
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
                string status = helper.VerifyUserDetails(email, name);
                if ( status== "Submitted" || status=="Saved")
                    return Request.CreateResponse(HttpStatusCode.OK, status);
                else
                    return Request.CreateResponse(HttpStatusCode.OK, "No such record");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }

        }

        [HttpPost]
        [Route("SaveData")]
        public HttpResponseMessage SaveData()
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;
                string email = httpRequest.Params["Email"];
                UserProfileData userProfile = JsonConvert.DeserializeObject<UserProfileData>(httpRequest.Params["UserProfile"]);
                OnboardingHelper helper = new OnboardingHelper();
               string status= helper.SaveUserProfileData(userProfile,email);
                return Request.CreateResponse(HttpStatusCode.OK, status);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }

        }

        [HttpPost]
        [Route("SubmitData")]
        public HttpResponseMessage SubmitData()
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;
                string email = httpRequest.Params["Email"];
                
                OnboardingHelper helper = new OnboardingHelper();
                helper.SubmitUserData(email);
                return Request.CreateResponse(HttpStatusCode.OK, "Success");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }

        }

        [HttpGet]
        [Route("GetProfileData")]
        public HttpResponseMessage GetProfileData(string emailId)
        {
            try
            {
                OnboardingHelper helper = new OnboardingHelper();
               UserProfile profileData= helper.GetUserProfileData(emailId);
                return Request.CreateResponse(HttpStatusCode.OK, profileData);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }

        }
    }
}
