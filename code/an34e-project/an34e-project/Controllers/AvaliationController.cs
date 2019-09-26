using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace an34e_project.Controllers
{
    public class AvaliationController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }
        public ContentResult QueryQuestionNps(int level, int requiredLevel, int isNps) {

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            var cmd = Models.Question.SelectQuestion(level, requiredLevel, isNps);

            return Content(serializer.Serialize(cmd.Quest).ToString());            
        }
    }
}