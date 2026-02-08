document.querySelectorAll('a[data-bs-dismiss="modal"][href^="#"]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        const modal = this.closest('.modal');
        if (modal) {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }
        }
        // Navigate after modal closes
        setTimeout(function () {
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    });
});

// Form validation with Bootstrap
const contactForm = document.getElementById('contactForm');
const formSuccessAlert = document.getElementById('formSuccessAlert');
const formErrorAlert = document.getElementById('formErrorAlert');
const formValidationAlert = document.getElementById('formValidationAlert');
const submitBtn = document.getElementById('submitBtn');
const submitText = submitBtn.querySelector('.submit-text');
const submitSpinner = submitBtn.querySelector('.spinner-border');

if (contactForm) {
    // Real-time validation on input
    ['nameInput', 'phoneInput', 'emailInput', 'motiveSelect', 'msgInput'].forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.addEventListener('input', function () {
                if (this.classList.contains('is-invalid')) {
                    this.classList.remove('is-invalid');
                }
                // Hide alerts when the user starts typing
                formSuccessAlert.classList.add('d-none');
                formValidationAlert.classList.add('d-none');
            });
            field.addEventListener('change', function () {
                if (this.classList.contains('is-invalid')) {
                    this.classList.remove('is-invalid');
                }
            });
        }
    });

    contactForm.addEventListener('submit', function (e) {
        // HTML5 validation passed
        e.preventDefault();
        e.stopPropagation();

        // Hide previous alerts
        formSuccessAlert.classList.add('d-none');
        formErrorAlert.classList.add('d-none');

        const name = document.getElementById('nameInput');
        const phone = document.getElementById('phoneInput');
        const email = document.getElementById('emailInput');
        const motive = document.getElementById('motiveSelect');
        const message = document.getElementById('msgInput');

        let isValid = true;

        // Clear previous validation styles
        [name, phone, email, motive, message].forEach(field => {
            field.classList.remove('is-invalid');
        });

        // Validate name
        if (!name.value.trim() || name.value.trim().length < 3) {
            name.classList.add('is-invalid');
            isValid = false;
        }

        // Validate phone
        const phonePattern = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
        if (!phone.value.trim() || !phonePattern.test(phone.value.trim())) {
            phone.classList.add('is-invalid');
            isValid = false;
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
            email.classList.add('is-invalid');
            isValid = false;
        }

        // Validate motive
        if (!motive.value) {
            motive.classList.add('is-invalid');
            isValid = false;
        }

        // Validate message
        if (!message.value.trim() || message.value.trim().length < 10) {
            message.classList.add('is-invalid');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitText.textContent = 'Enviando...';
        submitSpinner.classList.remove('d-none');

        emailjs.sendForm('service_qy4tioo', 'contact_form', '#contactForm').then(
            () => {
                // Reset button state
                submitBtn.disabled = false;
                submitText.textContent = 'Enviar Consulta';
                submitSpinner.classList.add('d-none');

                // Show a success message
                formSuccessAlert.classList.remove('d-none');

                // Reset form
                contactForm.reset();

                // Clear validation classes
                [name, phone, email, motive, message].forEach(field => {
                    field.classList.remove('is-invalid');
                });
            },
            (error) => {
                console.log('FAILED...', error);
            },
        );
    });
}