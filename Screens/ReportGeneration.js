import { Text, View, FlatList, Button, TouchableOpacity, Image } from 'react-native';
import React from 'react'
import { useEffect, useState } from 'react'
import styles from '../assets/stylesheets/style'
import { ViewOrder } from '../tools/actions/authActions'

const ReportGeneration = ({ route, navigation }) => {
    const [totalSalesPerSeller, setTotalSalesPerSeller] = useState([])

    useEffect(() => {

        ViewOrder()
            .then((orders) => {
                console.log("fetchData:", orders);
                //using reduce method to iterate over the order array to accumulate the total price for each unique seller
                const salesPerSeller = orders.reduce((acc, sale) => {
                    //extraction of the seller name and the productPrice from the order data
                    const { seller, productPrice } = sale;
                    //check to ensure if the seller name already exists as a key in the accumulator and if not initialise it with 0
                    if (!acc[seller]) {
                        acc[seller] = 0;
                    }
                    //add the productprice of the current order to the total order amount for the corresponding seller in the accumulator.
                    acc[seller] += parseFloat(productPrice);
                    return acc;
                }, {});

                setTotalSalesPerSeller(salesPerSeller);
            })
            .catch((error) => console.error("Error fetching data: ", error));
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.productCard}>
            <View >
                <Text style={{
                    marginTop: 10, marginLeft: 10,
                }}>Total sales for seller:</Text>
            </View>
            <View style={styles.rowValueTwo}>
                <Text style={styles.orderGenDetails}> {item.seller}</Text>

                <Text style={[styles.orderGenDetails, {
                    textAlign: 'right',color: 'red',textDecorationLine:'underline',


                }]}> £{item.productPrice.toFixed(2)}</Text>

            </View>


        </View>

    );


    return (
        <FlatList
            data={Object.entries(totalSalesPerSeller).map(([seller, productPrice]) => ({
                seller,
                productPrice,
            }))}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${index}-${item.seller}`}

        />
    )
}

export default ReportGeneration

