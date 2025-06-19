# Fares System Documentation

This directory contains comprehensive documentation for the British Rail Fares System, based on the official **RSPS5045 P-02-03 Fares and Associated Data Feed Interface Specification**.

## Overview

The fares system consists of multiple interconnected tables that define:
- **Locations** (stations, zones, counties)
- **Flows** (origin-destination pairs with associated fares)
- **Restrictions** (travel restrictions, time limits, train restrictions)
- **Tickets** (ticket types, validity periods, pricing)
- **Railcards** (discount schemes and minimum fares)
- **Routes** (permitted journey paths)
- **TOCs** (Train Operating Companies)
- **Packages** and **Supplements** (additional products)

## Documentation Structure

Each table is documented in its own markdown file with:
- **Official description** from RSPS5045 specification
- **Rate of change** information
- **Complete field definitions** including:
  - Field names (as per specification)
  - Field lengths and positions
  - Key indicators
  - Detailed descriptions with valid values
- **Relationships** to other tables
- **Record types** (for multi-record files)

## Key Files Updated with Official Specification

### Core Tables
- **`flow.md`** - Domestic non-discounted adult fares between all points
- **`location.md`** - Station and location details (42 fields)
- **`restriction_header.md`** - Travel restriction definitions
- **`station_cluster.md`** - Station cluster groupings

### Additional Tables
All other tables in this directory have been created based on the configuration files and data analysis, providing comprehensive coverage of the fares system.

## Data Format

The specification defines fixed-width text files with:
- **UPDATE_MARKER** - 'I' (Insert), 'A' (Amend), 'D' (Delete), 'R' (Refresh)
- **RECORD_TYPE** - Identifies the record type within multi-record files
- **Date fields** - Format: ddmmyyyy
- **High dates** - 31122999 indicates no defined end date

## Relationships

The fares system uses several key identifiers:
- **UIC_CODE** - Primary location identifier
- **NLC_CODE** - National Location Code for British locations
- **FLOW_ID** - Links flows to their associated fares
- **RESTRICTION_CODE** - Links restrictions to fares
- **TOC** - Train Operating Company codes

## Usage

This documentation is designed to help:
- **Developers** understand the data structure and relationships
- **Data analysts** interpret fare data and restrictions
- **System integrators** build interfaces to the fares system
- **Business users** understand fare calculation logic

## Source

All official specification details are sourced from:
**RSPS5045 P-02-03 Fares and Associated Data Feed Interface Specification**
Published by Rail Settlement Plan Limited
© 2025 Rail Settlement Plan Limited

## Rate of Change

Different tables have different update frequencies:
- **Flow data**: Possibly daily
- **Location data**: ~12 times per month
- **Restriction data**: ~3 times per week
- **Station clusters**: ~15 times per year
- **Non-derivable fares**: 3 times per year 