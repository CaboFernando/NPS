using an34e_project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace an34e_project.Controllers
{
    public class CustomerController : BaseController
    {
        Customer customer = new Customer();
        public ActionResult Index()
        {
            return View();
        }

        public ContentResult SaveCustomer(FormCollection formData)
        {
            var model = new Customer();
            TryUpdateModel(model, formData);
            model.CustomerSince = DateTime.Today;

            var response = model.Save();

            return (response) ? Content("{\"success\":true}", "application/json") : Content("{\"success\":false}", "application/json");
        }
        public ContentResult LoadCustomer(int id)
        {

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            var customer = Customer.SelectById(Convert.ToInt32(id));

            return Content(serializer.Serialize(customer).ToString());
        }
        //public ActionResult Edit(Int32 Id, String Quest, Int32 Level, Int32 RequiredLevel, Boolean Removed)
        //{

        //    var user = new Question().Update(Id, Quest, Level, RequiredLevel, Removed);

        //    return Index();
        //}
    }
}