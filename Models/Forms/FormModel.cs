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
        public string Description { get; set; }
        public List<FormFieldModel> FormFields { get; set; }
        public List<FormEmailModel> Emails { get; set; }

        public FormModel()
        {
            FormFields = new List<FormFieldModel>();
            Emails = new List<FormEmailModel>();
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
                StartDate = form.StartDate,
                Description = form.Description
            };

            if(deepLoad)
            {
                form.FormFields.ToList().ForEach(f => model.FormFields.Add(FormFieldModel.MapFormFieldModel(f)));
                form.Form_Emails.ToList().ForEach(e => model.Emails.Add(new FormEmailModel()
                {
                    Email = e.Email,
                    Id = e.Id,
                    FormId = e.FormId
                }));
            }

            return model;
        }

        public static Form MapModelToForm(FormModel model)
        {
            Form form = new Form()
            {
                ClubId = model.ClubId,
                CreatedByUserId = model.CreatedByUserId,
                CreatedDate = model.CreatedDate,
                EndDate = model.EndDate.ToUniversalTime(),
                Id = model.Id,
                IsDeleted = model.IsDeleted,
                IsExternal = model.IsExternal,
                Name = model.Name,
                StartDate = model.StartDate.ToUniversalTime(),
                Description = model.Description ?? string.Empty
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

            foreach (var email in model.Emails)
            {
                form.Form_Emails.Add(new Form_Emails()
                {
                    Email = email.Email,
                    FormId = form.Id,
                    Id = email.Id
                });
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