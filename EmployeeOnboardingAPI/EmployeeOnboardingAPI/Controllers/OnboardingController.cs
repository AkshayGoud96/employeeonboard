using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
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
                return Request.CreateResponse(HttpStatusCode.OK, status);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }

        }

        [HttpGet]
        [Route("GetFileName")]
        public HttpResponseMessage GetFileName(string fileid)
        {
            try
            {
                OnboardEntities onboard = new OnboardEntities();
                string filename = onboard.FileDatas.First(p => p.FID == fileid).FileName;
                return Request.CreateResponse(HttpStatusCode.OK, filename);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }

        }

        [HttpGet]
        [Route("DownloadFile")]
        public HttpResponseMessage DownloadFile(string data, string empid)
        {
            try
            {
                OnboardEntities onboard = new OnboardEntities();
                FileData file = onboard.FileDatas.ToList().Find(p => (p.UPID == empid && p.FID == data));
                string name = file.FileName;
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
                response.Content = new ByteArrayContent(file.File);
                response.Content.Headers.ContentLength = file.File.LongLength;
                response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                response.Content.Headers.ContentDisposition.FileName = file.FileName;
                return response;
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }

        }

        [HttpGet]
        [Route("DeleteData")]
        public HttpResponseMessage DeleteData(string dataid, string empid, string table)
        {
            try
            {
                using (OnboardEntities db = new OnboardEntities())
                {
                    if(table == "TechnicalSkills")
                        db.TechnicalSkillDatas.Remove(db.TechnicalSkillDatas.Where(x => (x.TSDID == dataid && x.UPID == empid)).First());
                    else if (table == "FunctionalSkills")
                        db.FunctionalSkillDatas.Remove(db.FunctionalSkillDatas.Where(x => (x.FSDID == dataid && x.UPID == empid)).First());
                    else if (table == "Qualifications")
                        db.QualificationDatas.Remove(db.QualificationDatas.Where(x => (x.QDID == dataid && x.UPID == empid)).First());
                    else if (table == "Trainings")
                        db.TainingDatas.Remove(db.TainingDatas.Where(x => (x.TDID == dataid && x.UPID == empid)).First());
                    else if (table == "Certifications")
                        db.CertificationDatas.Remove(db.CertificationDatas.Where(x => (x.CDID == dataid && x.UPID == empid)).First());
                    else if (table == "Memberships")
                        db.MembershipDatas.Remove(db.MembershipDatas.Where(x => (x.MDID == dataid && x.UPID == empid)).First());
                    else if (table == "Employers")
                        db.EmployerDatas.Remove(db.EmployerDatas.Where(x => (x.EDID == dataid && x.UPID == empid)).First());
                    else if (table == "Files")
                        db.FileDatas.Remove(db.FileDatas.Where(x => (x.FID == dataid && x.UPID == empid)).First());
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        [HttpGet]
        [Route("VerifyAdmin")]
        public HttpResponseMessage VerifyAdmin(string email, string password)
        {
            try
            {
                OnboardingHelper helper = new OnboardingHelper();
                string status = helper.VerifyAdminDetails(email, password);
                if (status == "Submitted" || status == "Saved")
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


        [HttpGet]
        [Route("GetFiles")]
        public HttpResponseMessage GetFiles(string email)
        {
            try
            {
                OnboardEntities onboard = new OnboardEntities();
                string upid = onboard.UserProfiles.First(s => s.email == email).UPID;
                List<FileData> filesdata = onboard.FileDatas.Where(s => s.UPID == upid).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, filesdata);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }

        }

       


        [HttpPost]
        [Route("UploadFile")]
        public HttpResponseMessage UploadFile()
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;
                var file = httpRequest.Files["File"];
                BinaryReader br = new BinaryReader(file.InputStream);
                byte[] filedata = br.ReadBytes(file.ContentLength);
                string currentemail = httpRequest.Params["Email"];
                string filedesc = httpRequest.Params["Filedesc"];
                string typeoffile = httpRequest.Params["Filetype"];
                OnboardEntities od = new OnboardEntities();
                string upid = od.UserProfiles.First(s => s.email == currentemail).UPID;
                FileData fd = new FileData();
                fd.FID = Convert.ToString(Guid.NewGuid());
                fd.UPID = upid;
                fd.File = filedata;
                fd.FileName = file.FileName;
                fd.TypeOfFile = typeoffile;
                fd.FileType = file.ContentType;
                fd.FileDescription = filedesc;
                od.FileDatas.Add(fd);
                od.SaveChanges();
                List<FileData> filesdata = od.FileDatas.Where(s => s.UPID == upid).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, filesdata);

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
                OnboardEntities db = new OnboardEntities();
                var httpRequest = HttpContext.Current.Request;
                string email = httpRequest.Params["Email"];
                UserOfferDetail ud = db.UserOfferDetails.First(x => x.emailID == email);
                ud.isEditable = false;
                ud.isSubmitted = true;
                db.SaveChanges();
                OnboardingHelper helper = new OnboardingHelper();
                string status =helper.SubmitUserData(email);
                return Request.CreateResponse(HttpStatusCode.OK, status);
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

        [HttpGet]
        [Route("GetAllUserData")]
        public HttpResponseMessage GetAllUserData()
        {
            try
            {
                OnboardingHelper helper = new OnboardingHelper();
                List<UserOfferDetail> profileData = helper.GetAllUsers();
                return Request.CreateResponse(HttpStatusCode.OK, profileData);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }

        }

        [HttpGet]
        [Route("CreateUserProfile")]
        public HttpResponseMessage CreateUserProfile(string email, string name)
        {
            try
            {
                OnboardingHelper helper = new OnboardingHelper();
                OnboardEntities onboard = new OnboardEntities();
                UserOfferDetail ud = new UserOfferDetail();
                ud.emailID = email;
                ud.name = name;
                ud.createdDate = DateTime.Now.ToString();
                ud.isSubmitted = false;
                ud.isEditable = true;
                onboard.UserOfferDetails.Add(ud);
                onboard.SaveChanges();
                List<UserOfferDetail> profileData = helper.GetAllUsers();
                return Request.CreateResponse(HttpStatusCode.OK, profileData);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }

        }

        [HttpGet]
        [Route("LoginAccess")]
        public HttpResponseMessage LoginAccess(int index)
        {
            try
            {
                OnboardingHelper helper = new OnboardingHelper();
                helper.SetLoginAccess(index);
                List<UserOfferDetail> userData = helper.GetAllUsers();
                return Request.CreateResponse(HttpStatusCode.OK, userData);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }

        }

        }
 }

