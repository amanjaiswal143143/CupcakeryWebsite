export async function apiRequest(method: string, url: string, body?: any) {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}

export const fetchOrders = () => apiRequest("GET", "/api/orders");
export const approveTestimonial = (id: number) => apiRequest("POST", `/api/testimonials/${id}/approve`);
export const updateOrderStatus = (id: number, status: string) => apiRequest("PATCH", `/api/orders/${id}/status`, { status });
