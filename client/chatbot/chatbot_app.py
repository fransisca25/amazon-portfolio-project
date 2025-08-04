import torch
import transformers
import streamlit as st
from apitoken import apitoken


@st.cache_resource
def load_pipeline():
    model_id = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"  # use tiny model 
    pipeline = transformers.pipeline(
        "text-generation", 
        model=model_id, 
        model_kwargs={"torch_dtype": torch.bfloat16}, 
        device_map="auto",  # Let it use GPU if available
        token=apitoken  # Add huggingface API token!!!
    )
    return pipeline


# Initialize session state for conversation history
if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "system", "content": ""}
    ]

pipeline = load_pipeline()

st.title("🤗 Dummy TinyLlama")
st.write("Chat with our Amazon bot assistant! Type your message below.")

# Chat input
if prompt := st.chat_input("May I Help You?"):
    st.session_state.messages.append({"role": "user", "content": prompt})
    
    # Display user message
    with st.chat_message("user"):
        st.write(prompt)
    
    # Generate response
    with st.chat_message("Amazon assistant"):
        with st.spinner("Thinking..."):
            try:
                outputs = pipeline(
                    max_new_tokens=256,  
                    do_sample=True,
                    temperature=0.7,
                    pad_token_id=pipeline.tokenizer.eos_token_id
                )
                
                # Extract response
                response = outputs[0]["generated_text"][-1]["content"]
                st.write(response)
                
                st.session_state.messages.append({"role": "assistant", "content": response})
                
            except Exception as e:
                st.error(f"{str(e)}")
                st.write("ERROR: Please try again!")

with st.sidebar:
    st.header("Chat Controls")
    
    if st.button("Clear Chat History"):
        st.rerun()
    
    st.header("Model Info")
    st.write("**Model:** TinyLlama-1.1B-Chat")
    st.write("**Device:** Auto (GPU if available)")
    st.write("**Max Tokens:** 256")
    
