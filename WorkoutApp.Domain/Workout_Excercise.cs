using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
namespace WorkoutApp.Domain
{
    public class Workout_Excercise
    {
        [BindRequired]
        [JsonRequired]
        public DateTime Workout_DateTime { get; set; }

        [BindRequired]
        [JsonRequired]
        public int Program_Version_Id { get; set; }

        [BindRequired]
        [JsonRequired]
        public int Excercise_Id { get; set; }

        [BindRequired]
        [JsonRequired]
        public int Weight { get; set; }

        [BindRequired]
        [JsonRequired]
        public int Set_Number { get; set; }

        [BindRequired]
        [JsonRequired]
        public int Rep_Number { get; set; }

        public string Workout_Excercise_Note { get; set; }

        [BindRequired]
        [JsonRequired]
        public DateTime Workout_Excercise_DateTime { get; set; }
    }
}
