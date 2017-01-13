using Gradera.Core.Entities;
using Gradera.Core.Enums;
using Gradera.Core.Filters;
using Gradera.Core.Helpers;
using Gradera.Grading.BLL;
using Gradera_Klubb.Models;
using Gradera_Klubb.Models.Grading;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Http;

namespace Gradera_Klubb.Controllers.Grading
{
    public class GradingController : ApiController
    {
        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Grading, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetGrades()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            List<GradeModel> grades = GradeModel.MapGradeModels(GradingAdminBLL.GetGrades(loggedInUser.AccountSession.ClubId));
            response.Content = new ObjectContent<List<GradeModel>>(grades,
                new JsonMediaTypeFormatter());
            return response;
        }

        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Grading, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetGradesWithoutBooklet()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            List<GradeModel> grades = GradeModel.MapGradeModels(GradingAdminBLL.GetGradesWithoutBooklet(loggedInUser.AccountSession.ClubId));
            response.Content = new ObjectContent<List<GradeModel>>(grades,
                new JsonMediaTypeFormatter());
            return response;
        }

        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Grading, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetGradingBooklets()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            List<GradingBookletModel> booklets = GradingBookletModel.MapBookletModels(GradingAdminBLL.GetGradingBooklets(loggedInUser.AccountSession.ClubId));
            response.Content = new ObjectContent<List<GradingBookletModel>>(booklets,
                new JsonMediaTypeFormatter());
            return response;
        }

        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Grading, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetGradingBooklet(int bookletId, bool deepLoad)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            GradingBookletModel booklet = GradingBookletModel.MapBookletModel(GradingAdminBLL.GetGradingBooklet(bookletId, loggedInUser.AccountSession.ClubId), deepLoad);
            response.Content = new ObjectContent<GradingBookletModel>(booklet,
                new JsonMediaTypeFormatter());
            return response;
        }

        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Grading, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetGrade(int id)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            GradeModel grade = GradeModel.MapGradeModel(GradingBLL.GetGrade(id, loggedInUser.AccountSession.ClubId), true);
            response.Content = new ObjectContent<GradeModel>(grade,
                new JsonMediaTypeFormatter());
            return response;
        }

        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Grading, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage ExportGrade(int id)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            string pdf = PdfGenerator.CreatePdfIText(id, loggedInUser.AccountSession.ClubId);
            response.Content = new ObjectContent<string>(pdf,
                new JsonMediaTypeFormatter());
            return response;
        }

        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Grading, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage ExportBooklet(int id)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            //string pdf = PdfGenerator.CreatePdfIText(id, loggedInUser.AccountSession.ClubId);
            //response.Content = new ObjectContent<string>(pdf,
            //    new JsonMediaTypeFormatter());
            return response;
        }
    }
}
