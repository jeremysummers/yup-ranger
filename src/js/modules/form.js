import * as yup from "yup";

document.addEventListener("alpine:init", () => {
  Alpine.data("form", () => ({
    formSchema: yup.object().shape({
      firstName: yup.string().required("Enter first name"),
      email: yup.string().email().required("Enter valid email"),
      password: yup.string().min(10).required(),
      agree: yup.boolean().required().oneOf([true], "Please agree"),
      gender: yup
        .string()
        .required()
        .oneOf(["male", "female"], "Choose gender"),
    }),
    formData: {
      firstName: "",
      email: "",
      password: "",
      agree: false,
      gender: "",
    },

    formErrors: {},
    blurred: {},

    isError(name) {
      return (
        this.formSubmitted ||
        (this.blurred[name] && this.formErrors[name]?.message)
      );
    },
    showError(name) {
      return this.formErrors[name]?.message;
    },
    focusout(e) {
      this.blurred[e.target.name] = true;
    },
    get isFormValid() {
      return this.formSchema.isValidSync(this.formData);
    },
    validateForm() {
      const self = this;
      this.formErrors = {};

      this.formSchema
        .validate(this.formData, { abortEarly: false })
        .catch(function (err) {
          err.inner.forEach((e) => {
            self.formErrors[e.path] = { message: e.message };
          });
        });
    },
    submit() {
      this.formSubmitted = true;

      if (this.isFormValid) {
        console.log("Submit stuff");
      } else {
        this.validateForm();
      }
    },
  }));
});
