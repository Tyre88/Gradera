using Gradera.Competition.BLL;
using Gradera.Core.Enums;
using Gradera_Klubb.Filters;
using Gradera_Klubb.Models;
using Gradera_Klubb.Models.Competition;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Http;

namespace Gradera_Klubb.Controllers.Competition
{
    public class CompetitionController : ApiController
    {
        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Competition, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetCompetitions()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            List<CompetitionModel> competitions = CompetitionModel.MapCompetitions(CompetitionBLL.GetCompetitions(loggedInUser.AccountSession.ClubId));
            response.Content = new ObjectContent<List<CompetitionModel>>(competitions, new JsonMediaTypeFormatter());
            return response;
        }

        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Competition, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetCompetition(int id)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            CompetitionModel competition = CompetitionModel.MapCompetitionDeep(CompetitionBLL.GetCompetitionDeep(id));
            response.Content = new ObjectContent<CompetitionModel>(competition, new JsonMediaTypeFormatter());
            return response;
        }

        [HttpPost, HttpOptions]
        [AuthorizeFilter(AccessType = AccessType.Competition, AccessTypeRight = AccessTypeRight.Write)]
        public HttpResponseMessage SaveCompetition(CompetitionModel competition)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            Gradera.Competition.DAL.Competition comp = CompetitionModel.MapCompetitionToDAL(competition);
            comp.ClubId = loggedInUser.AccountSession.ClubId;
            CompetitionBLL.SaveCompetition(comp);
            return response;
        }

        [HttpPost, HttpOptions]
        [AuthorizeFilter(AccessType = AccessType.Competition, AccessTypeRight = AccessTypeRight.Write)]
        public HttpResponseMessage AddCategory(int competitionId, string categoryName)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            Gradera.Competition.DAL.Competition_Category cat = new Gradera.Competition.DAL.Competition_Category()
            {
                Name = categoryName
            };
            cat = CompetitionBLL.AddCategory(competitionId, cat);
            response.Content = new ObjectContent<CompetitionCategoryModel>(new CompetitionCategoryModel()
            {
                Id = cat.Id,
                Name = cat.Name
            }, new JsonMediaTypeFormatter());
            return response;
        }

        [HttpPost, HttpOptions]
        [AuthorizeFilter(AccessType = AccessType.Competition, AccessTypeRight = AccessTypeRight.Write)]
        public HttpResponseMessage DeleteCategory(int id)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            CompetitionBLL.DeleteCategory(id);
            return response;
        }

        [HttpPost, HttpOptions]
        [AuthorizeFilter(AccessType = AccessType.Competition, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage SubscribeToCompetition(int competitionId, int categoryId)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            CompetitionBLL.SubscribeInternalCompeditor(competitionId, categoryId, loggedInUser.AccountSession.AccountId);
            return response;
        }
    }
}
