import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInvoice, deleteInvoice } from "../data/data";

export default function Invoice() {
	const navigate = useNavigate();
	const params = useParams();
	const invoice = getInvoice(parseInt(params.invoiceId!, 10));

	return (
		<main style={{ padding: "1rem" }}>
			<h2>Total Due: {invoice.amount}</h2>
			<p>
				{invoice.name}: {invoice.number}
			</p>
			<p>Due Date: {invoice.due}</p>
			<p>
				<button
					onClick={() => {
						deleteInvoice(invoice.number);
						navigate("/layout/invoices");
					}}
				>
					Delete
				</button>
			</p>
		</main>
	);
}
