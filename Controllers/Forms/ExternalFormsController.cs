using Gradera.Forms.BLL;
using Gradera_Klubb.Models.Forms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace Gradera_Klubb.Controllers.Forms
{
    public class ExternalFormsController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage GetForm(string clubShortName, string formName)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            FormModel form = FormModel.MapFormModel(FormsBLL.GetForm(clubShortName, formName), true);
            response.Content = new ObjectContent<FormModel>(form, new JsonMediaTypeFormatter());
            return response;
        }

        [HttpPost, HttpOptions]
        public HttpResponseMessage SubmitForm(List<SubmitFormFieldModel> formFields)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            FormsBLL.SubmitExternalForm(SubmitFormFieldModel.MapModelToExternalFormSubmitValues(formFields));
            return response;
        }
    }
}
