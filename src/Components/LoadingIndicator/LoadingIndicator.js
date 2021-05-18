import "./LoadingIndicator.css";
import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

export const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
    return (
        promiseInProgress &&
        <div className="Loader">
            <Loader type="ThreeDots" color="rgba(256, 256, 256, 0.8)"/>
        </div>
    );
}