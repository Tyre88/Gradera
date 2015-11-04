using Gradera_Klubb.Filters;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading.Tasks;
using System.Web.Http;

namespace Gradera_Klubb.Controllers.Core
{
    public class FileController : ApiController
    {
        [AuthorizeFilter]
        public async Task<HttpResponseMessage> UploadFile()
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            if (!Request.Content.IsMimeMultipartContent())
            {
                response.StatusCode = HttpStatusCode.UnsupportedMediaType;
            }
            else
            {
                MultipartMemoryStreamProvider provider = new MultipartMemoryStreamProvider();
                await Request.Content.ReadAsMultipartAsync(provider);
                Task<byte[]> fileData = provider.Contents.First().ReadAsByteArrayAsync();
                string fileName = string.Format("{0}.jpg", Guid.NewGuid().ToString());
                using (FileStream fs = new FileStream(string.Format(@"{0}Uploads\{1}", AppDomain.CurrentDomain.BaseDirectory, fileName), FileMode.OpenOrCreate))
                {
                    await fs.WriteAsync(fileData.Result, 0, fileData.Result.Length);
                    fs.Close();
                }

                response.Content = new ObjectContent<string>(fileName, new JsonMediaTypeFormatter());
            }

            return response;
        }
    }
}
