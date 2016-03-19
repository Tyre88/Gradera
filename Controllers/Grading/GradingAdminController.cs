using Gradera.Core.Entities;
using Gradera.Core.Enums;
using Gradera.Core.Filters;
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
    public class GradingAdminController : ApiController
    {
        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Grading, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetGradingCategories()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            List<GradingCategoryModel> categories = GradingCategoryModel.MapCategories(GradingAdminBLL.GetGradingCategories(loggedInUser.AccountSession.ClubId));
            response.Content = new ObjectContent<List<GradingCategoryModel>>(categories,
                new JsonMediaTypeFormatter());
            return response;
        }

        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Grading, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetGradingCategory(int id)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            GradingCategoryModel category = GradingCategoryModel.MapGategory(GradingAdminBLL.GetGradingCategory(id, loggedInUser.AccountSession.ClubId));
            response.Content = new ObjectContent<GradingCategoryModel>(category,
                new JsonMediaTypeFormatter());
            return response;
        }

        [HttpPost, HttpOptions]
        [AuthorizeFilter(AccessType = AccessType.Grading, AccessTypeRight = AccessTypeRight.Write)]
        public HttpResponseMessage SaveGradingCategory(GradingCategoryModel category)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            category.ClubId = loggedInUser.AccountSession.ClubId;
            GradingAdminBLL.SaveGradingCategory(GradingCategoryModel.MapToDal(category));
            return response;

        }

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
        public HttpResponseMessage GetGrade(int id)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            GradeModel grade = GradeModel.MapGradeModel(GradingAdminBLL.GetGrade(id, loggedInUser.AccountSession.ClubId), true);
            response.Content = new ObjectContent<GradeModel>(grade,
                new JsonMediaTypeFormatter());
            return response;
        }

        [HttpPost, HttpOptions]
        [AuthorizeFilter(AccessType = AccessType.Grading, AccessTypeRight = AccessTypeRight.Write)]
        public HttpResponseMessage SaveGrade(GradeModel grade)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            grade.ClubId = loggedInUser.AccountSession.ClubId;
            grade = GradeModel.MapGradeModel(GradingAdminBLL.SaveGrade(GradeModel.MapGradeDal(grade)), true);
            response.Content = new ObjectContent<GradeModel>(grade, new JsonMediaTypeFormatter());
            return response;
        }

        [HttpPost, HttpOptions]
        [AuthorizeFilter(AccessType = AccessType.Grading, AccessTypeRight = AccessTypeRight.Write)]
        public HttpResponseMessage SaveBooklet(GradingBookletModel booklet)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            booklet.ClubId = loggedInUser.AccountSession.ClubId;
            booklet = GradingBookletModel.MapBookletModel(GradingAdminBLL.SaveBooklet(GradingBookletModel.MapBookletDal(booklet)), true);
            response.Content = new ObjectContent<GradingBookletModel>(booklet, new JsonMediaTypeFormatter());
            return response;
        }

        [HttpDelete, HttpOptions]
        [AuthorizeFilter(AccessType = AccessType.Grading, AccessTypeRight = AccessTypeRight.Write)]
        public HttpResponseMessage DeleteBooklet(int bookletId)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            GradingAdminBLL.DeleteBooklet(bookletId, loggedInUser.AccountSession.ClubId);
            response.Content = new ObjectContent<bool>(true, new JsonMediaTypeFormatter());
            return response;
        }
    }
}
