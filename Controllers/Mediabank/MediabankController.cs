using Gradera.Core.Entities;
using Gradera.Core.Enums;
using Gradera.Core.Filters;
using Gradera.Core.Interfaces;
using Gradera.Entities.Mediabank;
using Gradera.Mediabank.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Http;

namespace Gradera_Klubb.Controllers.Mediabank
{
    public class MediabankController : ApiController
    {
        private IMediabank _mediabank;
        private IGenericItemPermissionsBLL _genericItemPermissionBLL;

        public MediabankController(IMediabank mediabank, IGenericItemPermissionsBLL genericItemPermissionBLL)
        {
            _mediabank = mediabank;
            _genericItemPermissionBLL = genericItemPermissionBLL;
        }

        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Mediabank, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetAllFiles()
        {
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;

            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            IList<int> fileIdsWithAccess = _genericItemPermissionBLL.GetObjectIdsOfType(GenericItemPermissionObjectTypes.MediabankFile, loggedInUser.AccountSession.ClubId, loggedInUser.AccountSession.AccountId);
            IList<MediabankEntity> mediabankFiles = _mediabank.GetAllFiles(loggedInUser.AccountSession.ClubId, loggedInUser.AccountSession.AccountId, fileIdsWithAccess);
            response.Content = new ObjectContent<IList<MediabankEntity>>(mediabankFiles, new JsonMediaTypeFormatter());
            return response;
        }

        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Mediabank, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetAllFilesWithType(string fileType)
        {
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;

            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            IList<int> fileIdsWithAccess = _genericItemPermissionBLL.GetObjectIdsOfType(GenericItemPermissionObjectTypes.MediabankFile, loggedInUser.AccountSession.ClubId, loggedInUser.AccountSession.AccountId);
            IList<MediabankEntity> mediabankFiles = _mediabank.GetAllFilesWithType(loggedInUser.AccountSession.ClubId, fileType, loggedInUser.AccountSession.AccountId, fileIdsWithAccess);
            response.Content = new ObjectContent<IList<MediabankEntity>>(mediabankFiles, new JsonMediaTypeFormatter());
            return response;
        }

        [HttpGet]
        [AuthorizeFilter(AccessType = AccessType.Mediabank, AccessTypeRight = AccessTypeRight.Read)]
        public HttpResponseMessage GetFile(int fileId)
        {
            UserPrincipal loggedInUser = (UserPrincipal)HttpContext.Current.User;

            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            if (_genericItemPermissionBLL.HasAccessToItem(GenericItemPermissionObjectTypes.MediabankFile, fileId, loggedInUser.AccountSession.AccountId))
            {
                MediabankEntity mediabankFile = _mediabank.GetFile(loggedInUser.AccountSession.ClubId, fileId);
                response.Content = new ObjectContent<MediabankEntity>(mediabankFile, new JsonMediaTypeFormatter()); 
            }
            else
            {
                response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
            }

            return response;
        }
    }
}
