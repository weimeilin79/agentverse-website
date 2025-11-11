document.addEventListener('DOMContentLoaded', () => {
    const classSelection = document.getElementById('class-selection');
    const modal = document.getElementById('mission-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const missionTitle = document.getElementById('mission-title');
    const creditLinkDisplay = document.getElementById('credit-link-display');
    const labLink = document.getElementById('lab-link');
    const creditLinkContainer = document.getElementById('credit-link-container');
    const copyFeedback = document.getElementById('copy-feedback');
    const consoleLinkContainer = document.getElementById('console-link-container');
    const consoleCopyFeedback = document.getElementById('console-copy-feedback');

    const backBtn = document.getElementById('modal-back-btn');
    const nextBtn = document.getElementById('modal-next-btn');
    
    let currentStep = 1;
    const totalSteps = 2; 

    // Open modal
    classSelection.addEventListener('click', (e) => {
        const card = e.target.closest('.class-card');
        if (card) {
            const className = card.dataset.class;
            const creditLink = card.dataset.creditLink;
            const labLinkUrl = card.dataset.labLink;

            missionTitle.textContent = `Your Mission: The ${className}`;
            creditLinkDisplay.textContent = creditLink;
            labLink.href = labLinkUrl;

            currentStep = 1;
            showStep(currentStep);
            modal.classList.remove('hidden');
        }
    });

    // Close modal
    const closeModal = () => {
        modal.classList.add('hidden');
    };
    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Step navigation
    const showStep = (step) => {
        // Hide all steps
        document.querySelectorAll('.modal-step-content').forEach(s => s.classList.add('hidden'));
        // Show current step
        document.getElementById(`modal-step-${step}`).classList.remove('hidden');

        // Update button visibility and text
        backBtn.classList.toggle('hidden', step === 1);
        nextBtn.classList.toggle('hidden', step === totalSteps);
    };

    nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        }
    });

    backBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    // Clipboard functionality
    const copyToClipboard = (text, feedbackElement) => {
        navigator.clipboard.writeText(text).then(() => {
            feedbackElement.classList.remove('hidden');
            setTimeout(() => {
                feedbackElement.classList.add('hidden');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    creditLinkContainer.addEventListener('click', () => {
        copyToClipboard(creditLinkDisplay.textContent, copyFeedback);
    });

    consoleLinkContainer.addEventListener('click', () => {
        const consoleUrl = document.getElementById('console-link-display').textContent;
        copyToClipboard(consoleUrl, consoleCopyFeedback);
    });
});

