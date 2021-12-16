import * as yup from "yup";

document.addEventListener("alpine:init", () => {
  Alpine.data("form", () => ({
    init() {
      this.formSchema = yup.object().shape({
        firstName: yup.string().required("Enter first name"),
        email: yup.string().email().required(),
        password: yup.string().min(10).required(),
        agree: yup.boolean().required().oneOf([true], "Please agree"),
        gender: yup
          .string()
          .required()
          .oneOf(["male", "female"], "Choose gender"),
      });
    },
    formSchema: {},
    formData: {
      firstName: "name",
      email: "",
      password: "",
      agree: false,
      gender: "",
    },
    formErrors: {},
    validateForm() {
      const self = this;
      this.formSchema
        .validate(this.formData, { abortEarly: false })
        .catch(function (err) {
          const errors = {};
          err.inner.forEach((e) => {
            errors[e.path] = { message: e.message };
          });
          self.formErrors = errors;
        });
    },
    onchange() {
      console.log("change");
      this.validateForm();
    },
    onblur() {
      console.log("blur");
    },
    onsubmit() {
      console.log("on submit");
    },
  }));
});
