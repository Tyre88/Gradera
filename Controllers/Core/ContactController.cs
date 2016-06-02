using Gradera.Core.BLL;
using Gradera.Core.DAL;
using Gradera.Core.Entities;
using Gradera.Core.Enums;
using Gradera.Core.Filters;
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
        [AuthorizeFilter(AccessType = AccessType.Contact, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetAllContacts()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;
            List<Contact> contacts = ContactBLL.GetContacts(loggedInUser.AccountSession.ClubId);
            response.Content = new ObjectContent<List<Contact>>(contacts, new JsonMediaTypeFormatter());
            return response;
        }

        [AuthorizeFilter(AccessType = AccessType.Contact, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetContact(int contactId)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            Contact contact = ContactBLL.GetContact(contactId);
            response.Content = new ObjectContent<Contact>(contact, new JsonMediaTypeFormatter());
            return response;
        }
    }
}
