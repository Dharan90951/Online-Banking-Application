    // Function to calculate the tip and total amount
    function calculateTip() {
        // Get the values from the input fields
        const billAmount = parseFloat(document.getElementById('billAmount').value);
        const tipPercentage = parseInt(document.getElementById('tipPercentage').value);
  
        // Validate if the bill amount is a valid number
        if (isNaN(billAmount) || billAmount <= 0) {
          alert("Please enter a valid bill amount.");
          return;
        }
  
        // Calculate the tip amount
        const tipAmount = (billAmount * tipPercentage) / 100;
        const totalAmount = billAmount + tipAmount;
  
        // Display the results
        document.getElementById('tipAmount').textContent = tipAmount.toFixed(2);
        document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);
      }
