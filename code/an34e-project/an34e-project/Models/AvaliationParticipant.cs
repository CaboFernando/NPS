using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace an34e_project.Models {
    public class AvaliationParticipant : BaseClass{
        public Avaliation IdAvaliation { get; set; }
        public Customer IdCustomer { get; set; }
        public Question IdQuestions { get; set; }
        public int Score { get; set; }
        public string Feedback { get; set; }
        public bool IsValid { get; set; }
        public bool Finished { get; set; }
        public string Justificative { get; set; }
        public string FeedbackCategory { get; set; }
    }
}