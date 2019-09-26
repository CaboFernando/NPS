using System;
using System.Web.Mvc;

namespace an34e_project.Models {
    public class Avaliation :  BaseClass {
        public string Code { get; set; }
        public string Month { get; set; }
        public string Year { get; set; }        
        public bool Finished { get; set; }
        public int Detrators { get; set; }
        public int Neutrals { get; set; }
        public int Promoters { get; set; }
        public decimal Result { get; set; }
        public User IdUser { get; set; }
    }
}
