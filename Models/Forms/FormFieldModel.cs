using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Gradera.Forms.DAL;

namespace Gradera_Klubb.Models.Forms
{
    public class FormFieldModel
    {
        public int Id { get; set; }
        public int FormId { get; set; }
        public string ClassName { get; set; }
        public string Type { get; set; }
        public string Label { get; set; }
        public bool IsRequired { get; set; }
        public List<FormFieldOptionModel> Options { get; set; }

        public FormFieldModel()
        {
            Options = new List<FormFieldOptionModel>();
        }

        internal static FormFieldModel MapFormFieldModel(FormFields formField)
        {
            FormFieldModel model = new FormFieldModel()
            {
                ClassName = formField.ClassName,
                FormId = formField.FormId,
                Id = formField.Id,
                IsRequired = formField.IsRequired,
                Label = formField.Label,
                Type = formField.Type
            };

            formField.FormFieldsOptions.ToList().ForEach(f => model.Options.Add(FormFieldOptionModel.MapFormFieldOptionModel(f)));

            return model;
        }
    }
}