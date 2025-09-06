import React from 'react';
import { View, Button, Alert } from 'react-native';
import RNPrint from 'react-native-print';

export default function Print() {
  const printReceipt = async () => {
    try {
      // Dummy Data
      const canteenName = "Basavatarakam Canteen";
      const currentDateTime = new Date().toLocaleString();
      const ordersWithItems = [
        { itemName: "Burger", quantity: 2, price: 50 },
        { itemName: "Fries", quantity: 1, price: 30 },
        { itemName: "Coke", quantity: 1, price: 20 },
      ];
      const totalAmount = ordersWithItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // HTML content optimized for 80mm receipt with auto-cut spacing
      const printContent = `
        <html>
        <head>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 0; 
              padding: 5px; 
              font-size: 14px; 
              text-align: center;
              width: 100%;
            }
            .header { font-size: 18px; font-weight: bold; margin-bottom: 5px; }
            .subheader { font-size: 14px; margin-bottom: 5px; }
            .datetime { font-size: 12px; margin-bottom: 8px; }
            .items-header { font-size: 14px; font-weight: bold; margin: 8px 0; border-bottom: 1px dashed #000; padding-bottom: 4px; }
            table { width: 100%; border-collapse: collapse; font-size: 14px; margin: 0 auto; }
            th, td { padding: 3px; text-align: center; }
            .total-line { border-top: 1px solid #000; margin-top: 8px; }
            .total { font-weight: bold; font-size: 16px; margin-top: 5px; }
            .footer-space { padding-top: 15px; font-size: 14px; font-weight: bold; }
            .cut-space { margin-top: 50px; } /* extra space for auto-cut */
          </style>
        </head>
        <body>
          <div class="header">${canteenName}</div>
          <div class="datetime">${currentDateTime}</div>
          
          <div class="items-header">Items</div>
          <table>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
            ${ordersWithItems
              .map(
                item => `
                <tr>
                  <td>${item.itemName}</td>
                  <td>${item.quantity}</td>
                  <td>₹${item.price * item.quantity}</td>
                </tr>
              `
              )
              .join('')}
          </table>

          <div class="total-line"></div>
          <div class="total">Total: ₹${totalAmount}</div>
          <div class="footer-space">Thank You For Using WORLDTEK</div>

          <!-- Extra blank space for auto-cut -->
          <div class="cut-space"><br><br><br><br></div>
        </body>
        </html>
      `;

      await RNPrint.print({ html: printContent });
      Alert.alert('Success', 'Print dialog opened!');
    } catch (error) {
      console.log('Print Error:', error);
      Alert.alert('Error', 'Failed to print');
    }
  };

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Button title="Print Dummy Receipt" onPress={printReceipt} />
    </View>
  );
}
