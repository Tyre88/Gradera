﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gradera_Klubb.Models.Forms
{
    public class FormEmailModel
    {
        public int Id { get; set; }
        public int FormId { get; set; }
        public string Email { get; set; }
    }
}