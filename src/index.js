import React from "react";
import {render} from "react-dom";
import Component from "./component";
import './index.scss'

const styles = {
    fontFamily: "sans-serif",
};
//Name	Email	Country	Commercial Zone	Commercial Region	City	Locatio

/*
	        edx@example.com	—	—	—	—	—	—	1	0	0	1	0	0%	0 / 4	0	0:00:00	04/06/2019
The Honor	honor@example.com	—	—	—	—	—	—	1	0	0	1	0	0%	0 / 4	0	0:00:00	23/12/2019
Judy Sim	audit@example.com	—	—	—	—	—	—	1	0	0	1	0	0%	0 / 4	0	0:00:00	26/12/2019
verified	verified@example.com	—	—	—	—	—	—	1	0	0	1	0	0%	0 / 4	0	0:00:00	23/12/2019
Geo Marie  	staff@example.com	—	—	—	—	—	—	1	0	0	1	0	0%	0 / 4	35	16:45:26	05/02/2020
Jale Dave	davejale@gmail.com	France	—	—	shanghai	—	2345678	1	0	0	0	1	0%	0 / 4	0	0:00:00	—
Jale Dave1	davejale1@gmail.com
*/
let fields = [
    //{ name:'', fieldName:'id' },
    /*{name: 'Name', fieldName: 'userName'},
    {name: 'Email', fieldName: 'email'},
    {name: 'Country', fieldName: 'country'},*/
    //{ name:'', fieldName:'id' },
    { name:'email', fieldName:'email' },
    { name:'first_name', fieldName:'first_name' },
    { name:'last_name', fieldName:'last_name' },
    { name:'avatar', fieldName:'avatar' },
    { name:'first_name1', fieldName:'first_name' },
    { name:'last_name1', fieldName:'last_name' },
    { name:'first_name2', fieldName:'first_name' },
    { name:'last_name2', fieldName:'last_name' },
    { name:'first_name3', fieldName:'first_name' },
    { name:'last_name3', fieldName:'last_name' },
    { name:'first_name4', fieldName:'first_name' },
    { name:'last_name4', fieldName:'last_name' },
    { name:'first_name5', fieldName:'first_name' },
    { name:'last_name5', fieldName:'last_name' },
]
let data_p1 = [
    {id: 'a0', test1: 't1', userName: 'The Honor', email: 'honor@example.com', country: 'US'},
]
let data2 = [
    {id: 'a0', test1: 't1', userName: 'The Honor', email: 'honor@example.com', country: 'US'},
    {id: 'a1', test1: 't11', userName: 'Judy Sim', email: 'audit@example.com', country: 'France'},
    {id: 'a2', test1: 't1111', userName: 'verified', email: 'verified@example.com', country: 'Brazil'},
]
let totalData = {
    email: '3'
}

const data3 = [
    {
        id: 1,
        email: "george.bluth@reqres.in",
        first_name: "George",
        last_name: "Bluth",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"
    }
]

//https://reqres.in/api/users?page=2


class App extends React.Component {
    constructor(props, context) {
        super(props, context);

        //fetch data then place data and rowsCount into state
        this.state = {
            data: [],
            totalData: {},
            rowsCount: 0
        }

        //this.fetchData(1)
    }

    loadData() {
        this.setState((s, p) => {
            return {
                data: data2,
                rowsCount:75
            }
        })
    }

    /*
    let data = {a1:'11', a2:'22'}
    let parametersStr = Object.keys(data).map(k=>`${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&')
    */

    fetchData(pageNo) {
        /*page: 1
        per_page: 6
        total: 12
        total_pages: 2*/
        let data = {a1:'11', a2:'22'}
        let parametersStr = Object.keys(data).map(k=>`${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&')

        const url = `https://reqres.in/api/users?page=${pageNo}&per_page=2${(parametersStr ? ('&'+parametersStr) : '')}`
        fetch(url).then(response=>{
            return response.json()
        }).then(json=>{
            this.setState((s, p) => {
                return {
                    data: json.data,
                    totalData:{email:'total:', first_name: json.total},
                    rowsCount: json.total
                }
            })
        })
    }

    render() {
        const pagination = {pageSize: 2, rowsCount: this.state.rowsCount}
        return (
            <div style={styles}>
                <button className="btn-load-data" onClick={this.loadData.bind(this)}>Load data</button>
                <Component enableRowsCount={true}
                    keyField="id" {...this.state}
                    fields={fields} pagination={pagination}
                    onPageChange={this.fetchData.bind(this)}
                />
            </div>
        );
    }
}

render(<App/>, document.querySelector(".root"));
