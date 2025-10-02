
 import axiosInstance from "./axios";
export const signup =async (signupData) =>{
    const response =await axiosInstance.post("/auth/signup",signupData);
    return response.data
}
export const login =async (loginData)=>{
    const response =await axiosInstance.post("/auth/login",loginData);
    return response.data ;
}
export const logout =async ()=>{
    const response =await axiosInstance.post("/auth/logout");
    return response.data ;
}

export const getAuthUser=async ()=>{
     try{
        const res=await axiosInstance.get("/auth/me");
        return res.data;
     }catch(error){
        console.log("error in getAuthUse",error);
        return null ;
     }
} ;

export const completeOnboarding =async (userData)=>{
     const  response= await axiosInstance.post("/auth/onboarding",userData);
     return response.data ;
}

export async function getRecommendedUsers() {
    const response =await axiosInstance.get("/users") ;
    return response.data ;
}

export async function getUserFriends() {
    const response =await axiosInstance.get("/users/friends") ;
    return response.data ;
}


export async function getOutgoingFriendReqs() {
    try {
        console.log("Fetching outgoing friend requests...");
        const response = await axiosInstance.get("/users/outgoing-friend-requests");
        console.log("Outgoing friend requests response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching outgoing friend requests:", error.response?.data || error.message);
        throw error;
    }
}

export async function sendFriendRequest(userId) {
    console.log("Sending friend request to user:", userId);
    try {
        const response = await axiosInstance.post(`/users/friends-request/${userId}`);
        console.log("Friend request response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Friend request error:", error.response?.data || error.message);
        throw error;
    }
}

export async function getFriendRequests() {
    try {
        console.log("Fetching friend requests...");
        const response = await axiosInstance.get("/users/friend-requests");
        console.log("Friend requests response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching friend requests:", error.response?.data || error.message);
        throw error;
    }
}

export async function acceptFriendRequest(requestId) {
    const response =await axiosInstance.put(`/users/friends-request/${requestId}/accept`) ;
    return response.data ;
}

export async function getStreamToken(requestId) {
    const response =await axiosInstance.get("/chat/token") ;
    return response.data ;
}

