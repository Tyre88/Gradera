using Gradera.Entities.Mediabank;
using Gradera.Mediabank.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace Gradera_Klubb.Controllers.Mediabank
{
    public class MediabankExternalController : ApiController
    {
        private IMediabank _mediabank;

        public MediabankExternalController(IMediabank mediabank)
        {
            _mediabank = mediabank;
        }

        [HttpGet]
        public HttpResponseMessage GetFile(string fileGUID)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            MediabankEntity mediabankFile = _mediabank.GetFile(fileGUID);
            if (mediabankFile != null && mediabankFile.IsExternal)
            {
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
