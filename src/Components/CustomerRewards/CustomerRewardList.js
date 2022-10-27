import React, { useState, useEffect } from "react";
import { Layout, Table } from 'antd'
import 'antd/dist/antd.css';
import "./CustomerRewardList.css"
const { Header, Content, Footer } = Layout;

const CustomerRewardList = (props) => {

    const columns = [
        {
            title: 'Customer ID',
            dataIndex: 'custid',
            key: 'custid',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Amount',
            dataIndex: 'amt',
            key: 'amt',
        },
        {
            title: 'Transaction Date',
            dataIndex: 'transactionDt',
            key: 'transactionDt',
        },
        {
            title: 'Reward Points',
            dataIndex: 'reward',
            key: 'reward',
        },
    ];

    function subtractMonths(numOfMonths, date = new Date()) {
        date.setMonth(date.getMonth() - numOfMonths);

        return date;
    }

    const CurrentDate = new Date();
    const DateBeforeThreeMonths = subtractMonths(3);
    const [CustomerRewardList, setCustomerRewardList] = useState([]);
    const getData = (id) => {
        fetch('CustomerRewards.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setCustomerRewardList(data.filter(function (a) {
                    let rewardPoints = 0;
                    let over100 = a.amt - 100;

                    if (over100 > 0) {
                        //  2 points for every dollar spent over $100 in each transaction      
                        rewardPoints += (over100 * 2) + 50;
                    }
                    if (a.amt > 50 && a.amt <= 100) {
                        // plus 1 point for every dollar spent over $50 in each transaction

                        // rewardPoints += 50;
                        rewardPoints += a.amt - 50;
                    }
                    a.reward = rewardPoints
                    const transactiondate = new Date(a.transactionDt)
                    return (a.custid == id)
                        && (transactiondate > DateBeforeThreeMonths && transactiondate < CurrentDate)
                }))
            });
    }
    useEffect(() => {
        //Passing CustomerID
        getData('1')
    }, [])

    return (
        <Layout>
            <Header>Customer Transaction Rewards</Header>
            <Content>

                <Table
                    dataSource={CustomerRewardList.concat(
                        (() => {
                            let reward = 0;
                            for (let row of CustomerRewardList) {
                                reward += row["reward"];
                            }
                            return { key: "total", name: "Total Reward Points", reward };
                        })())}
                    columns={columns} pagination={false}
                    tableLayout='fixed'
                />
            </Content>
            <Footer></Footer>
        </Layout>


    )
}
export default CustomerRewardList
