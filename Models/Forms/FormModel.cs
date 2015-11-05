using Gradera.Forms.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gradera_Klubb.Models.Forms
{
    public class FormModel
    {
        public int Id { get; set; }
        public int CreatedByUserId { get; set; }
        public int ClubId { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsExternal { get; set; }
        public bool IsDeleted { get; set; }
        public string Name { get; set; }
        public List<FormFieldModel> FormFields { get; set; }

        public FormModel()
        {
            FormFields = new List<FormFieldModel>();
        }

        public static FormModel MapFormModel(Form form, bool deepLoad = false)
        {
            FormModel model = new FormModel()
            {
                ClubId = form.ClubId,
                CreatedByUserId = form.CreatedByUserId,
                CreatedDate = form.CreatedDate,
                EndDate = form.EndDate,
                Id = form.Id,
                IsDeleted = form.IsDeleted,
                IsExternal = form.IsExternal,
                Name = form.Name,
                StartDate = form.StartDate
            };

            if(deepLoad)
                form.FormFields.ToList().ForEach(f => model.FormFields.Add(FormFieldModel.MapFormFieldModel(f)));

            return model;
        }

        public static Form MapModelToForm(FormModel model)
        {
            Form form = new Form()
            {
                ClubId = model.ClubId,
                CreatedByUserId = model.CreatedByUserId,
                CreatedDate = model.CreatedDate,
                EndDate = model.EndDate,
                Id = model.Id,
                IsDeleted = model.IsDeleted,
                IsExternal = model.IsExternal,
                Name = model.Name,
                StartDate = model.StartDate
            };

            foreach (var item in model.FormFields)
            {
                FormFields field = new Gradera.Forms.DAL.FormFields()
                {
                    ClassName = item.ClassName,
                    FormId = form.Id,
                    Id = item.Id,
                    IsRequired = item.IsRequired,
                    Label = item.Label,
                    Type = item.Type
                };

                item.Options.ForEach(o => field.FormFieldsOptions.Add(new FormFieldsOptions()
                {
                    FormFieldId = field.Id,
                    GroupName = o.GroupName,
                    Id = o.Id,
                    Name = o.Name
                }));

                form.FormFields.Add(field);
            }

            return form;
        }

        public static List<FormModel> MapFormModels(List<Form> forms)
        {
            List<FormModel> models = new List<FormModel>();
            forms.ToList().ForEach(f => models.Add(MapFormModel(f)));
            return models;
        }
    }
}