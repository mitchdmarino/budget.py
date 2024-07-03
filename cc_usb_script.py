import os
import pdfplumber
import pandas as pd
import re

directory_path = './cc_statements'
cc_statements = [f for f in os.listdir(directory_path) if f.endswith('.pdf')]
charges_list = []
credits_list = []

# Define a function to extract the section text
def extract_section(text, start_title, end_title=None):
    pattern = re.compile(fr'{re.escape(start_title)}(.*?){re.escape(end_title) if end_title else ""}', re.DOTALL)
    match = pattern.search(text)
    if match:
        print(start_title)
        print(match.group(1))
        print(match.group(0))
        return match.group(1)
    return ""

# Define a function to parse the text for itemized entries
def parse_entries(text):
    # Adjust the pattern according to the format of your entries
    # Example pattern for: mm/dd mm/dd 1234 Description $123.45
    pattern = r'(\d{2}/\d{2})\s+(\d{2}/\d{2})\s+(\d{4})\s+(.+?)\s+(-?\$[\d,]+\.\d{2})'
    matches = re.findall(pattern, text)
    return matches

# Open the PDF file
def parse_files(path):
    path = directory_path + "/" + path
    with pdfplumber.open(path) as pdf:
        all_pages_text = []
        
        # Loop through all pages and extract text
        for page in pdf.pages:
            text = page.extract_text()
            all_pages_text.append(text)

    # Combine all the text into a single string
    combined_text = "\n".join(all_pages_text)

    # Extract sections for charges and credits
    charges_text = extract_section(combined_text, "Purchases and Other Debits", "TOTAL THIS PERIOD")
    credits_text = extract_section(combined_text, "Payments and Other Credits", "TOTAL THIS PERIOD")

    # Parse the sections for itemized entries
    charges = parse_entries(charges_text)
    credits = parse_entries(credits_text)

    # Convert the list of charges into a pandas DataFrame
    df_charges = pd.DataFrame(charges, columns=['Post Date', 'Transaction Date', 'Ref#', 'Description', 'Amount'])
    df_credits = pd.DataFrame(credits, columns=['Post Date', 'Transaction Date', 'Ref#', 'Description', 'Amount'])

    # Clean and format the dataframes as needed
    for df in [df_charges, df_credits]:
        #df['Post Date'] = pd.to_datetime(df['Post Date'], format='%m/%d')
        #df['Transaction Date'] = pd.to_datetime(df['Transaction Date'], format='%m/%d')
        df['Amount'] = df['Amount'].replace({'\$': '', ',': ''}, regex=True).astype(float)

    # Print the dataframes
    print("Charges:")
    print(df_charges)
    charges_list.append(df_charges)
    
    print("\nCredits:")
    print(df_credits)
    credits_list.append(df_credits)


for statement in cc_statements: 
    parse_files(statement)

# Concatenate all charges and credits DataFrames
print("################################################################################################")
print(charges_list)
print(credits_list)
all_charges_df = pd.concat(charges_list, ignore_index=True)
all_credits_df = pd.concat(credits_list, ignore_index=True)

# Save to CSV
all_charges_df.to_csv('./organized_cc_statements/charges.csv', index=False)
all_credits_df.to_csv('./organized_cc_statements/credits.csv', index=False)

print("Charges and credits have been successfully combined and saved to CSV files.")