using Gradera.Core.Enums;
using Gradera.Techniques.BLL;
using Gradera_Klubb.Filters;
using Gradera_Klubb.Models;
using Gradera_Klubb.Models.Techniques;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Http;

namespace Gradera_Klubb.Controllers.Techniques
{
    public class TechniqueAdminController : ApiController
    {
        [HttpPost, HttpOptions]
        [AuthorizeFilter(AccessType = AccessType.Techniques, AccessTypeRight = AccessTypeRight.Write)]
        public HttpResponseMessage SaveTechniqueType(TechniqueTypeModel techniqueType)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            techniqueType.ClubId = loggedInUser.AccountSession.ClubId;
            TechniqueAdminBLL.SaveTechniqueType(TechniqueTypeModel.MapTechniqueTypeToDAL(techniqueType));
            return response;
        }

        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Techniques, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetTechniqueTypes()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            response.Content = new ObjectContent<List<TechniqueTypeModel>>(TechniqueTypeModel.MapTechniqueTypes(TechniqueAdminBLL.
                GetTechniqueTypes(loggedInUser.AccountSession.ClubId)), 
                new JsonMediaTypeFormatter());
            return response;
        }

        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Techniques, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetTechniqueType(int id)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            TechniqueTypeModel type = TechniqueTypeModel.MapTechniqueType(TechniqueAdminBLL.
                GetTechniqueType(id, loggedInUser.AccountSession.ClubId));
            response.Content = new ObjectContent<TechniqueTypeModel>(type,
                new JsonMediaTypeFormatter());
            return response;
        }

        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Techniques, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetTechnique(int id)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            TechniqueModel technique = TechniqueModel.MapTechniqueModel(TechniqueAdminBLL.GetTechnique(id, loggedInUser.AccountSession.ClubId));
            response.Content = new ObjectContent<TechniqueModel>(technique,
                new JsonMediaTypeFormatter());
            return response;
        }

        [HttpPost, HttpOptions]
        [AuthorizeFilter(AccessType = AccessType.Techniques, AccessTypeRight = AccessTypeRight.Write)]
        public HttpResponseMessage SaveTechnique(TechniqueModel technique)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            technique.ClubId = loggedInUser.AccountSession.ClubId;
            TechniqueAdminBLL.SaveTechnique(TechniqueModel.MapTechniqueToData(technique));
            return response;
        }

        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Techniques, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetTechniques()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            List<TechniqueModel> techniques = TechniqueModel.MapTechniqueModels(TechniqueAdminBLL.GetTechniques(loggedInUser.AccountSession.ClubId));
            response.Content = new ObjectContent<List<TechniqueModel>>(techniques,
                new JsonMediaTypeFormatter());
            return response;
        }
    }
}
