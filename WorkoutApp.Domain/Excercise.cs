using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace WorkoutApp.Domain
{
    public class Excercise
    {
        [BindRequired]
        [JsonRequired]
        public int Excercise_Id { get; set; }

        [BindRequired]
        [JsonRequired]
        public string Excercise_Name { get; set; }

        [BindRequired]
        [JsonRequired]
        public string Excercise_Desc { get; set; }
    }
}
