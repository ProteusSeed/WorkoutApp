using System;
using System.Collections.Generic;
using System.Text;

namespace WorkoutApp.Domain
{
    public class Program_Version : Program
    {
        public int Program_Version_Id { get; set; }
        public string Program_Version_Desc { get; set; }
        public DateTime Program_Version_Date_Active { get; set; }
    }
}
