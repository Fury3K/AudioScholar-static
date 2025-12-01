package edu.cit.audioscholar.util

sealed class Resource<T>(
    val data: T? = null,
    val message: String? = null
) {
    class Success<T>(data: T) : Resource<T>(data)

    class Error<T>(message: String, data: T? = null) : Resource<T>(data, message)

    class Loading<T>(data: T? = null) : Resource<T>(data)
}

inline fun <T> Resource<T>.onSuccess(action: (T) -> Unit): Resource<T> {
    if (this is Resource.Success && data != null) {
        action(data)
    }
    return this
}

inline fun <T> Resource<T>.onFailure(action: (Throwable) -> Unit): Resource<T> {
    if (this is Resource.Error) {
        action(Exception(message ?: "Unknown Error"))
    }
    return this
}