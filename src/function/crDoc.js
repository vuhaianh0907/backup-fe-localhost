// import './banner.css';
import { useHistory } from 'react-router-dom';
import React from 'react';
import '../BodyContent/banner.css'

export default function crDoc() {
    return (
        <div className="ct" >
            <nav className="box"  >
            <form action="..." method="POST" style={{marginTop: "10vmin"}}  >
            <h2>Create a product</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Doctor ID: </td>
                        <td><input type='text'name=""  defaultValue=""  /></td>
                    </tr>
                    <tr>
                        <td>Doctor Name: </td>
                        <td><input type="text" name="" defaultValue="" /></td>
                    </tr>
                    <tr>
                        <td>Info 1: </td>
                        <td><input type="text" name="" defaultValue="" /></td>
                    </tr>
                    <tr>
                        <td>Info 2: </td>
                        <td><input type="text" name="" defaultValue="" /></td>
                    </tr>
                    <tr>
                        <td>Info 3: </td>
                        <td><input type="text" name="" defaultValue="" /></td>
                    </tr>
                    <tr>
                        <td>Info 4: </td>
                        <td><input type="text" name="" defaultValue="" /></td>
                    </tr>
                    <tr>
                        <td>Info 5: </td>
                        <td><input type="text" name="" defaultValue="" /></td>
                    </tr>
                    <tr>
                        <td>Info 6: </td>
                        <td><input type="text" name="" defaultValue="" /> <br/></td>
                    </tr>
                </tbody>
            </table>
            <button type="submit" name="action" value="crDoc" >Create</button>
        </form>
            </nav>
        </div>
    );
}