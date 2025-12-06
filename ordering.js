// Ordering page functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation handling for cross-page links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's a cross-page link (contains .html or #)
            if (href.includes('.html#')) {
                // Let the browser handle the page navigation with hash
                return;
            } else if (href.includes('.html')) {
                // Regular page navigation
                return;
            } else if (href.startsWith('#')) {
                // Section link - check if it exists on current page
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    e.preventDefault();
                    const navHeight = document.querySelector('#navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    // Section doesn't exist on current page, go to home page
                    e.preventDefault();
                    window.location.href = 'index.html' + href;
                }
            }
        });
    });
    
    // Ordering status configuration
    const OrderingStatus = {
        CLOSED: 'closed',
        OPEN: 'open',
        SOLD_OUT: 'sold_out'
    };
    
    // Current status - this would normally come from an API
    let currentStatus = OrderingStatus.CLOSED;
    let orderingDeadline = null; // Set this when ordering is open
    
    // DOM elements
    const statusBanner = document.getElementById('status-banner');
    const statusTitle = document.getElementById('status-title');
    const statusMessage = document.getElementById('status-message');
    const countdownContainer = document.getElementById('countdown-container');
    const countdownTimer = document.getElementById('countdown-timer');
    // Removed timeline status element
    
    const signupSection = document.getElementById('signup-section');
    const orderSection = document.getElementById('order-section');
    const soldoutSection = document.getElementById('soldout-section');
    
    const orderForm = document.getElementById('order-form');
    const quantitySelect = document.getElementById('quantity');
    const summaryQuantity = document.getElementById('summary-quantity');
    const summaryTotal = document.getElementById('summary-total');
    const checkoutButton = document.getElementById('checkout-button');
    const termsCheckbox = document.getElementById('terms-accept');
    
    // Stripe configuration
    const stripe = Stripe('pk_test_your_publishable_key_here'); // Replace with actual key
    
    // Status management functions
    function checkOrderingStatus() {
        // This would normally be an API call to Google Apps Script
        // For now, using localStorage to simulate different states
        const testStatus = localStorage.getItem('ordering-status') || OrderingStatus.CLOSED;
        const testDeadline = localStorage.getItem('ordering-deadline');
        
        currentStatus = testStatus;
        if (testDeadline) {
            orderingDeadline = new Date(testDeadline);
        }
        
        updatePageState();
    }
    
    function updatePageState() {
        // Reset all sections
        signupSection.style.display = 'none';
        orderSection.style.display = 'none';
        soldoutSection.style.display = 'none';
        countdownContainer.style.display = 'none';
        
        switch (currentStatus) {
            case OrderingStatus.CLOSED:
                updateClosedState();
                break;
            case OrderingStatus.OPEN:
                updateOpenState();
                break;
            case OrderingStatus.SOLD_OUT:
                updateSoldOutState();
                break;
        }
        
        // Timeline update removed
    }
    
    function updateClosedState() {
        statusBanner.className = 'status-banner closed';
        statusTitle.textContent = 'Ordering Currently Closed';
        statusMessage.textContent = 'Sign up below to be notified when ordering opens';
        signupSection.style.display = 'block';
        // No timeline status to update
    }
    
    function updateOpenState() {
        statusBanner.className = 'status-banner open';
        statusTitle.textContent = 'Ordering Now Open';
        
        if (orderingDeadline) {
            const now = new Date();
            const timeLeft = orderingDeadline - now;
            
            if (timeLeft > 0) {
                statusMessage.textContent = 'Limited time remaining - order now!';
                countdownContainer.style.display = 'block';
                startCountdown(timeLeft);
            } else {
                // Deadline passed, switch to closed
                currentStatus = OrderingStatus.CLOSED;
                updatePageState();
                return;
            }
        } else {
            statusMessage.textContent = 'Order now while supplies last!';
        }
        
        orderSection.style.display = 'block';
        // No timeline status to update
    }
    
    function updateSoldOutState() {
        statusBanner.className = 'status-banner sold-out';
        statusTitle.textContent = 'This Year\'s Production Sold Out';
        statusMessage.textContent = 'Thank you for your interest! Join the list for next year\'s design.';
        soldoutSection.style.display = 'block';
        // No timeline status to update
    }
    
    function updateTimeline() {
        // Timeline styling removed - all steps display equally
    }
    
    function startCountdown(timeLeft) {
        function updateCountdown() {
            const now = new Date();
            const remaining = orderingDeadline - now;
            
            if (remaining <= 0) {
                countdownTimer.textContent = 'Order window has closed';
                currentStatus = OrderingStatus.CLOSED;
                setTimeout(updatePageState, 1000);
                return;
            }
            
            const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            
            let countdownText = '';
            if (days > 0) {
                countdownText = `${days} day${days !== 1 ? 's' : ''}, ${hours} hour${hours !== 1 ? 's' : ''}`;
            } else if (hours > 0) {
                countdownText = `${hours} hour${hours !== 1 ? 's' : ''}, ${minutes} minute${minutes !== 1 ? 's' : ''}`;
            } else {
                countdownText = `${minutes} minute${minutes !== 1 ? 's' : ''}`;
            }
            
            countdownTimer.textContent = countdownText;
        }
        
        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 60000); // Update every minute
        
        // Store interval for cleanup if needed
        window.orderingCountdownInterval = countdownInterval;
    }
    
    // Order form functionality
    function updateOrderSummary() {
        const quantity = parseInt(quantitySelect.value) || 1;
        const price = 25.00;
        const total = quantity * price;
        
        summaryQuantity.textContent = quantity;
        summaryTotal.textContent = `$${total.toFixed(2)}`;
        
        validateOrderForm();
    }
    
    function validateOrderForm() {
        const formValid = orderForm.checkValidity() && termsCheckbox.checked;
        checkoutButton.disabled = !formValid;
    }
    
    // Event listeners for order form
    if (quantitySelect) {
        quantitySelect.addEventListener('change', updateOrderSummary);
    }
    
    if (orderForm) {
        orderForm.addEventListener('input', validateOrderForm);
    }
    
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', validateOrderForm);
    }
    
    // Stripe checkout handling
    if (checkoutButton) {
        checkoutButton.addEventListener('click', async function() {
            if (checkoutButton.disabled) return;
            
            const formData = new FormData(orderForm);
            const orderData = {
                customerName: formData.get('customerName'),
                customerPhone: formData.get('customerPhone'),
                customerEmail: formData.get('customerEmail'),
                pickupPerson: formData.get('pickupPerson'),
                quantity: parseInt(formData.get('quantity')),
                total: parseInt(formData.get('quantity')) * 2500 // Amount in cents
            };
            
            checkoutButton.textContent = 'Processing...';
            checkoutButton.disabled = true;
            
            try {
                // This would call your backend to create Stripe checkout session
                const response = await fetch('/api/create-checkout-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                });
                
                const session = await response.json();
                
                // Redirect to Stripe checkout
                const result = await stripe.redirectToCheckout({
                    sessionId: session.id
                });
                
                if (result.error) {
                    throw new Error(result.error.message);
                }
                
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error processing your order. Please try again.');
                checkoutButton.textContent = 'Complete Order with Stripe';
                checkoutButton.disabled = false;
            }
        });
    }
    
    // Email signup handling (for both closed and sold out states)
    const signupForms = document.querySelectorAll('.ordering-signup-form');
    
    signupForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            const button = this.querySelector('button');
            
            if (!email) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            const originalText = button.textContent;
            button.textContent = 'Subscribing...';
            button.disabled = true;
            
            // Create form data
            const formData = new FormData();
            formData.append('email', email);
            formData.append('source', currentStatus === OrderingStatus.SOLD_OUT ? 'soldout' : 'closed');
            
            // Submit to Google Apps Script (same endpoint as main page)
            fetch('https://script.google.com/macros/s/AKfycbzFZ3W6ezMOb7ZJXXnTRyBMLplAi4-7QxzloDRs03sfMiZxYyZQZmj2gol3bbdvzcAJ/exec', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    button.textContent = 'Subscribed!';
                    button.style.background = '#28a745';
                    emailInput.value = '';
                    
                    // Show success message
                    const successMsg = document.createElement('p');
                    successMsg.textContent = currentStatus === OrderingStatus.SOLD_OUT 
                        ? 'Thanks! We\'ll notify you about next year\'s design.'
                        : 'Thanks! We\'ll notify you when ordering opens.';
                    successMsg.style.color = '#28a745';
                    successMsg.style.marginTop = '10px';
                    successMsg.style.fontWeight = '500';
                    this.appendChild(successMsg);
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.background = '';
                        button.disabled = false;
                        if (successMsg.parentNode) {
                            successMsg.remove();
                        }
                    }, 3000);
                } else {
                    throw new Error(data.message || 'Subscription failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                button.textContent = 'Try Again';
                button.style.background = '#dc3545';
                
                // Show error message
                const errorMsg = document.createElement('p');
                errorMsg.textContent = 'Something went wrong. Please try again.';
                errorMsg.style.color = '#dc3545';
                errorMsg.style.marginTop = '10px';
                this.appendChild(errorMsg);
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    button.disabled = false;
                    if (errorMsg.parentNode) {
                        errorMsg.remove();
                    }
                }, 3000);
            });
        });
    });
    
    // Developer tools for testing different states
    if (window.location.search.includes('dev=true')) {
        console.log('Developer mode enabled. Use setOrderingStatus() to test different states.');
        
        window.setOrderingStatus = function(status, deadlineInHours = null) {
            localStorage.setItem('ordering-status', status);
            
            if (deadlineInHours && status === OrderingStatus.OPEN) {
                const deadline = new Date();
                deadline.setHours(deadline.getHours() + deadlineInHours);
                localStorage.setItem('ordering-deadline', deadline.toISOString());
            } else {
                localStorage.removeItem('ordering-deadline');
            }
            
            checkOrderingStatus();
        };
        
        window.clearOrderingStatus = function() {
            localStorage.removeItem('ordering-status');
            localStorage.removeItem('ordering-deadline');
            checkOrderingStatus();
        };
        
        // Add developer UI
        const devUI = document.createElement('div');
        devUI.style.cssText = 'position: fixed; top: 10px; right: 10px; background: #fff; border: 1px solid #ccc; padding: 10px; z-index: 10000; font-size: 12px;';
        devUI.innerHTML = `
            <strong>Dev Tools</strong><br>
            <button onclick="setOrderingStatus('closed')">Closed</button>
            <button onclick="setOrderingStatus('open', 24)">Open (24h)</button>
            <button onclick="setOrderingStatus('sold_out')">Sold Out</button>
            <button onclick="clearOrderingStatus()">Reset</button>
        `;
        document.body.appendChild(devUI);
    }
    
    // Initialize page state
    checkOrderingStatus();
    
    // Update summary on page load
    updateOrderSummary();
});