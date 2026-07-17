namespace nasa_dashboard_api.Models
{
    public static class NasaLocations
    {
        public static readonly Dictionary<string, (double Latitude, double Longitude)> Locations = new()
        {
            { "Karachi", (24.8607, 67.0011) },
            { "Lahore", (31.5204, 74.3587) },
            { "Islamabad", (33.6844, 73.0479) },
            { "Rawalpindi", (33.5651, 73.0169) },
            { "Faisalabad", (31.4504, 73.1350) },
            { "Multan", (30.1575, 71.5249) },
            { "Peshawar", (34.0151, 71.5249) },
            { "Quetta", (30.1798, 66.9750) },
            { "Hyderabad", (25.3960, 68.3578) },
            { "Gilgit", (35.9208, 74.3089) }
        };
    }
}
