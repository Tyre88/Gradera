using Gradera.Competition.BLL;
using Gradera.Core.BLL;
using Gradera.Core.Helpers;
using Gradera_Klubb.Models.Competition;
using Gradera_Klubb.Models.Competition.External;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace Gradera_Klubb.Controllers.Competition
{
    public class ExternalCompetitionController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage GetCompetition(string clubShortName, string competitionName)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            CompetitionModel competition = CompetitionModel.MapCompetition(CompetitionBLL.GetExternalCompetition(clubShortName, competitionName));
            response.Content = new ObjectContent<CompetitionModel>(competition, new JsonMediaTypeFormatter());
            return response;
        }

        [HttpPost, HttpOptions]
        public HttpResponseMessage Submit(CompetitionContactPersonModel contactPerson)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            try
            {
                CompetitionBLL.SubmitExternal(CompetitionContactPersonModel.MapToContactPerson(contactPerson));
            }
            catch (Exception ex)
            {
                LogHelper.LogError(string.Format("Error: ExternalCompetitionController.Submit"), ex, -1);
                response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
            return response;
        }
    }
}
