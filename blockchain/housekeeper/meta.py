import json
import os

# Path to the input JSON file
input_file_path = 'nfts.json'

# Directory where output JSON files will be saved
output_directory = 'output_nfts'
os.makedirs(output_directory, exist_ok=True)

# Read the NFT data from the input file
with open(input_file_path, 'r') as file:
    nft_data = json.load(file)

# Iterate over the list of NFTs and save each to a separate file
for index, nft in enumerate(nft_data):
    output_file_path = os.path.join(output_directory, f'{index + 1}.json')
    with open(output_file_path, 'w') as file:
        json.dump(nft, file, indent=4)

print(f'Successfully saved {len(nft_data)} NFT files in {output_directory} directory.')
