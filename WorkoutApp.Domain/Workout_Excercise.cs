using System;

namespace WorkoutApp.Domain
{
    public class Workout_Excercise
    {
    public DateTime Workout_DateTime { get; set; }
        public int Program_Version_Id { get; set; }
        public int Excercise_Id { get; set; }
        public int Weight { get; set; }
        public int Set_Number { get; set; }
        public int Rep_Number { get; set; }
        public string Workout_Excercise_Note { get; set; }
    }
}
