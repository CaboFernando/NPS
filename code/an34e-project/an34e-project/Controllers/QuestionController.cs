using an34e_project.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace an34e_project.Controllers {
    public class QuestionController : BaseController
    {
        public ActionResult Index() {

            var lst = new Question().ListQuestions();

            return View("Conteudo", lst);
        }
        public ContentResult Insert(String Quest, Int32 Level, Int32 RequiredLevel) {

            var user = new Question().Insert(Quest, Level, RequiredLevel);

            return Content("{success:"+ user +"}");
        }
        public ContentResult Remove(int id) {

            Question user = new Question();
            
            return Content("{success:" + user.Remove(id) + "}");
        }
        public ContentResult Load(int id) {

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            var question = Question.SelectById(Convert.ToInt32(id));

            return Content(serializer.Serialize(question).ToString());
        }
        public ContentResult Edit(Int32 Id, String Quest, Int32 Level, Int32 RequiredLevel) {

            var user = new Question().Update(Id, Quest, Level, RequiredLevel);
            
            return Content("{success:" + user + "}");
        }
    }
}