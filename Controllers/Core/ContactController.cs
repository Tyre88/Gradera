using Gradera.Core.BLL;
using Gradera.Core.DAL;
using Gradera.Core.Entities;
using Gradera.Core.Enums;
using Gradera.Core.Filters;
using Gradera_Klubb.Models.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Http;

namespace Gradera_Klubb.Controllers.Core
{
    public class ContactController : ApiController
    {
        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Contact, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetAllContacts()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            List<Contact> contacts = ContactBLL.GetContacts(loggedInUser.AccountSession.ClubId);
            List<ContactModel> models = ContactModel.MapModels(contacts);
            response.Content = new ObjectContent<List<ContactModel>>(models, new JsonMediaTypeFormatter());
            return response;
        }

        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Contact, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetContact(int contactId)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            Contact contact = ContactBLL.GetContact(contactId);
            response.Content = new ObjectContent<Contact>(contact, new JsonMediaTypeFormatter());
            return response;
        }

        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Contact, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetContactForEmail(string email, int clubId)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            Contact contact = ContactBLL.GetContactForEmail(email, clubId);

            return response;
        }
    }
}
